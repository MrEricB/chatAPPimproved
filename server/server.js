const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));



io.on('connection', () => {
	console.log('new connection');
});




server.listen(PORT, () => {
	console.log("Sever up on port " + PORT);
})