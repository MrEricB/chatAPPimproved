const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();// list of current users

app.use(express.static(publicPath));


/* 
NOTES:
io.emit => emits to all connected users: romm -> io.to('Room name').emit
socket.bordcast.emit => emits to all connecte users but the current user: romm -> socket.brodcast.to('Room name').emit
socket.emit => emits event specifically to one user: no need form room since we target user specifically
*/



io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }

    socket.join(params.room); //join a specific room
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

   
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //welcome the new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the App'));
    //let other user know about the new user
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  //Handles messeages the user sends
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);

    //sends newMessage to all users
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  //Handles user location stuff
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });

  //Handles when user leaves chat
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      
    }

  });
});





server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
