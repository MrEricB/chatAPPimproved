const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //welcome the new user
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcom to the chat',
    createdAt: new Date().getTime()
    
  });

  //let other user know about the new user
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });


  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);

    //sends newMessage to all users
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

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
