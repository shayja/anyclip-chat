const jwt = require('jsonwebtoken');
const { parseEnv } = require('../config/index');
const {User} = require('../db');

const authenticate = async (account) => {
   
    let user = null;
    try {
        // Create a new user
        user = await User.create({ username: account.username, avatar: account.avatar, ipAddress: account.ipAddress });
        console.log("auto-generated ID:", user.id);
    } catch (error) {
        if (error && error.toString().indexOf('UniqueConstraintError') !== -1){
            console.log('User.create error: ', error);
            throw new Error('User already exists');
        } else {
            throw new Error('Db error'+error);
        }
    }

    if (user)
    {
        const respAccount = {username: account.username, avatar: account.avatar};
        // authentication successful so generate jwt and refresh tokens
        respAccount.token = generateJwtToken(respAccount, user.id);
        return respAccount;
    }
    return null;
}

const generateJwtToken =  (account, userId) => {
// function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.username, id: userId }, parseEnv("TOKEN_SECRET"), { expiresIn: '7d' });
}

module.exports = {
    authenticate
};
