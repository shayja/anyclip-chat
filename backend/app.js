const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const bodyParser = require('body-parser')

const app = express();

const PORT = 3001;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


const server = app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`)
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        console.log('socket.on SEND_MESSAGE');
        io.emit('RECEIVE_MESSAGE', data);
    })
});

// middleware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests

// api routes
app.use('/accounts', require('./accounts/account.controller'));
app.use('/messages', require('./messages/message.controller'));

