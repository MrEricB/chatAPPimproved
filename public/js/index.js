var socket = io();

//no arrow functions for mobile and cross-browser compatibility
//TODO: change to arrow functions in the future, when support is better

//Initial Connection
socket.on('connect', function() {
  console.log('Connected to server');
});

//When user leaves chat
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Handles the recieve of a new message from other user
socket.on('newMessage', function (message) {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

//Handles creation of URL for to view user loaction
socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);  
});

//Submition of new message by the Users
jQuery('#message-form').on('submit', function(event){
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});


//Button for user to send location
var locationButton = jQuery("#send-location");
locationButton.on('click', function(){
  if(!navigator.geolocation){
    //TODO: Add bootstrap or other fancy modal later
    return alert('Geolocation not supported on your browser')
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    alert('Unable to fetch location')
  });

});
