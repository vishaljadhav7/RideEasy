const socketIo = require('socket.io');
const Driver = require('./models/driver.model');
const User = require('./models/user.model');

let io;

function createSocketConnection(server) {
  io = socketIo(server, {
    cors : {
        origin : "http://localhost:5173",
        methods : ['GET', 'POST']
    }
  });
  
  io.on('connection', (socket) => {
    console.log(`Client connected ${socket.id}`);

    socket.on('join', async (data) => {
        const {clientId, clientType}  = data;
        
        if(clientType === 'ride'){
            await User.findByIdAndUpdate(clientId, {socketId : socket.id});
        }else if(clientType === 'driver'){
            await Driver.findByIdAndUpdate(clientId, {socketId : socket.id});
        }
    }); 

    socket.on('update-driver-location', async (data) => {
        const {clientId, location}  = data;

        if(!location || !location.ltd || !location.lng){
            socket.emit('error', {message : 'invalid location data'});
        }

        await Driver.findByIdAndUpdate(clientId, {
            location : {
                latitude : location.ltd,
                longitude : location.lng
            }
        })
    })

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    })
  })
}

const emitMessageToSocketId = (socketId, messageObject) => {
   if(io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
   } else {
    console.log('Socket.io not initialized.');
   }
}

module.exports = { createSocketConnection , emitMessageToSocketId };