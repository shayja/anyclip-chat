const path = require('path');
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

// to access the files in public folder
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// it enables all cors requests
app.use(cors()); 

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

// api routes
app.use('/accounts', require('./accounts/account.controller'));
app.use('/messages', require('./messages/message.controller'));

