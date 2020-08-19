const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


// It's a test app so allow all cors requests
app.use(cors({ origin: '*' }));

const server = app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`)
});

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



// api routes
app.use('/accounts', require('./accounts/account.controller'));
app.use('/messages', require('./messages/message.controller'));

