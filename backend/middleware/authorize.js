const jwt = require('jsonwebtoken');
const { parseEnv } = require('../config/index');

const authorize = (req, res, next) => {

    // Get the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, parseEnv('TOKEN_SECRET'), (err, user) => {    
        if (err) {
            console.log(`jwt.verify error ${err}`);
            return res.sendStatus(403);
        }

        console.log('req.user', user);

        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
};

module.exports = authorize;