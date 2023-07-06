import { io } from '../server';

io.on('connection', (socket) => {
  socket.on('createMessage', (message) => {
    io.emit('newMessage', message);
  });
});
