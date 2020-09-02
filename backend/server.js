const express = require('express');

// dotenv init - relevant for local only.
const dotenv = require('dotenv');
const result = dotenv.config({silent: true});

if (result.error) {
    if (process.env.NODE_ENV === 'production' && result.error.code === 'ENOENT') {
        console.info('expected this error because we are in production without a .env file');
    } else {
        throw result.error;
    }
}
// end dotenv

const cors = require('cors');

const app = express();

// It's a test app so let's requests from any origin
var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// Set the routes
require('./routes')(app);

const initChat = (server) => {
    console.log('init chat socket.');
    const chatSocket = require('./chat.socket');
    // init chat socket.
    chatSocket(server);
};

// set port, listen for requests
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    initChat(server);
});
