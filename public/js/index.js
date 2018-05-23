var socket = io();

//no arrow functions for mobile and cross-browser compatibility
//TODO: change to arrow functions in the future, when support is better
socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'eric',
    text: 'this is the message'
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log(message);
});

