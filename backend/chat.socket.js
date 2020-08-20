const socket = require('socket.io');

const chatSocket = (server)=>{

    const io = socket(server);

    io.on('connection', (socket) => {
    
        console.log(`User connected ${socket.id}`);
    
        // On client request
        socket.on('SEND_MESSAGE', (data) => {
            console.log(`socket.on SEND_MESSAGE ${socket.id}`);  
            io.emit('RECEIVE_MESSAGE', data);
        });
    
        // Once the second server has finished his job
        socket.on('disconnect', () => {
            console.log(`disconnect`);
            socket.disconnect();
        });
    });
    
}

module.exports = chatSocket;
