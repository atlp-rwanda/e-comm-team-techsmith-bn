import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import socketio from 'socket.io';
import allRoutes from './routes/allRoutes.js';
import db from '../database/models/index.js';
import './utils/shedulerController.js';
import chatController from './controllers/chatroomController.js';

// CONFIGURE DOTENV
dotenv.config();

// PATH TO STATIC FILES
const views = path.join(__dirname, 'views');

const app = express();

// SET DEFALULT ENGINE FOR TESING
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));
app.use('/chat', express.static(views));

app.use(
  session({
    secret: [process.env.SESSIONCOOKIE],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
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

const dbCon = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.log(`db error: ${error.message}`);
  }
};

Promise.all([dbCon(), server]).then(() => {
  console.log(`Server listening on port:${PORT}`);
  console.log('DB connection successful');
});

// eslint-disable-next-line
io.on('connection', async (socket) => {
  socket.on('createMessage', async (message) => {
    const newMessage = await chatController.createChat(message.messageBody, message.roomId, message.user.id);
    const payload = {...newMessage.dataValues, user: message.user}
    io.emit('newMessage', payload);
  })
  socket.on('getChat', async (roomId) => {
    const getChat = await chatController.getChat(roomId);
    io.emit('roomMessages', getChat);
  });

  socket.on('searchRoom', async (searchData) => {
    const searchRoom = await chatController.searchRoom(searchData.name, searchData.page, searchData.size);
    console.log(searchRoom)
    io.emit('searchResults', searchRoom);
  });
});


export { io };
export default app;
