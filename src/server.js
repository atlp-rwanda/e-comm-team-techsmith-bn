/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import moment from 'moment';
import passport from 'passport';
import cookieSession from 'cookie-session';
import socketio from 'socket.io';
import allRoutes from './routes/allRoutes.js';
import db from '../database/models/index.js';
import './utils/shedulerController.js';
import {
  addActiveUser,
  // addActiveUser,
  createMessage,
  getActiveUsers,
  getMessages,
  removeActiveUser,
} from './controllers/chatroomController.js';

// CONFIGURE DOTENV
dotenv.config();

// PATH TO STATIC FILES
const views = path.join(__dirname, 'views');

const app = express();

// SET DEFALULT ENGINE FOR TESING
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));
app.use('/chat', express.static(views));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSIONCOOKIE],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', allRoutes);
const { PORT } = process.env;

// CREATE EXPRESS SERVER
const server = app.listen(PORT);

// INITIALIZE SOCKET.IO
const io = socketio(server);

// eslint-disable-next-line
io.on('connection', async (socket) => {
  // ALTER USER CONNECTION MESSAGE
  const userConnected = {
    message: 'A user has joined the chat',
    time: moment().format('MMM D, h:mm A'),
  };
  // ADD LOGGED IN USER TO ACTIVE USERS
  socket.on('userLogin', async (user) => {
    const newUser = await addActiveUser(user);
    io.emit('newUser', newUser);
  });
  socket.on('joinChat', async (user) => {
    // GET ACTIVE USERS
    const activeUsers = await getActiveUsers();
    // BROADCAST ACTIVE USERS
    io.emit('activeUsers', activeUsers);
    console.log(`User ${user.name} has joined the chat`);
  });
  // BROADCAST WHEN USER CONNECTS
  socket.emit('message', userConnected);
  // GET MESSAGES FROM DB
  const messages = await getMessages();
  // SEND MESSAGES TO CLIENT
  socket.emit('serverMessages', messages);
  // CREATE NEW MESSAGE IN DB
  socket.on('createMessage', async (message) => {
    try {
      createMessage(message)
        .then((newMessage) => {
          // eslint-disable-next-line
          console.log(newMessage);
          io.emit('newMessage', newMessage);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    } catch (error) {
      console.log(error, message);
    }
  });
  socket.on('leave', async (user) => {
    const response = await removeActiveUser(user);
    console.log(typeof response);
  });
});

const dbCon = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.log(`db error: ${error.message}`);
  }
};

Promise.all([dbCon(), server]).then(() => {
  console.log('DB connection successful');
  console.log(`Server listening on port:${PORT}`);
});

export { io };
export default app;
