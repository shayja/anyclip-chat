const express = require('express');

// dotenv init
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
const bodyParser = require('body-parser');
const app = express();
const chatSocket = require('./chat.socket');

// Set the port by env or default.
const port = process.env.PORT || 5000;

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// It's a test app so allow all cors requests
app.use(cors({ origin: '*' }));

const server = app.listen(port, function(){
    console.log(`server is running on port ${port}`);
});

// init chat socket.
chatSocket(server);

// api routes
app.use('/accounts', require('./accounts/account.controller'));
app.use('/messages', require('./messages/message.controller'));

// send errors as json
app.use(function(err, req, res/*, next*/) {
    // Log error message in our server's console
    console.error(err.message);
    if (!err.statusCode) {
        // If err has no specified error code, set error code to 'Internal Server Error (500)'
        err.statusCode = 500; 
    }
    // All HTTP requests must have a response, so let's send back an error with its status
    res.status(err.statusCode).send({error : err.message}); 
});