const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //welcome the new user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the App'));

  //let other user know about the new user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!!!'));


  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);

    //sends newMessage to all users
    io.emit('newMessage', generateMessage(message.from, message.text));

    //brodcast sends to all users except the user that sent it
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});





server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
