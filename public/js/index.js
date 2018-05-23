var socket = io();

//no arrow functions for mobile and cross-browser compatibility
//TODO: change to arrow functions in the future, when support is better
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(event){
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});


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
