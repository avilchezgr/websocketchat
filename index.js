const path = require('path');
const express = require('express');

// server config
const app = express();

// settings
app.set('port', process.env.PORT || 3002);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
// end server config

// start websocket config

const SocketIO = require('socket.io');
const io = SocketIO(server);

//Websockets
io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  socket.on('chat:message', (data) => {
    console.log('data', data);
    io.sockets.emit('chat:message', data);
  });
  
  socket.on('chat:typing', (data) => {
    console.log('dataTyping', data);
    
    // para que el usuario que lo manda no lo reciba también
    socket.broadcast.emit('chat:typing', data);
  });
});
