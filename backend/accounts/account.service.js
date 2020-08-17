const jwt = require('jsonwebtoken');
const config = require('../config.json');
const {User} = require('../db');

const authenticate = async ({ username, avatar, ipAddress }) => {
   
    let user = null;
    try {
        // Create a new user
        user = await User.create({ username: username, avatar: avatar, ipAddress: ipAddress });
        console.log("auto-generated ID:", user.id);
    } catch (error) {
        if (error && error.toString().indexOf('UniqueConstraintError') !== -1){
            console.log('User.create error: ', error);
            throw new Error('User already exists');
        } else {
            throw new Error('Db error');
        }
    }

    if (user)
    {
        const account = {username, avatar};
        // authentication successful so generate jwt and refresh tokens
        account.token = generateJwtToken(account, user.id);
        return account;
    }
    return null;
}

const generateJwtToken =  (account, userId) => {
// function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.username, id: userId }, config.secret, { expiresIn: '7d' });
}

module.exports = {
    authenticate
};
