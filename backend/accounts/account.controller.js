const express = require('express');
const router = express.Router();

const accountService = require('./account.service');
const fileupload = require('../fileupload');

// routes
router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res, next) {

    // console.log('req.body', req.body);

    const { username, avatar } = req.body;

    const fileName = fileupload.uploadBase64(avatar);
    // console.log(fileName);
    const ipAddress = req.ip;
    accountService.authenticate({ username, fileName, ipAddress })
        .then((account) => {

            account.avatar = fileName;
            console.log(account);

            // setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(next);
}
/*
function setTokenCookie(res, token) {
    // create cookie with refresh token
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('chatToken', token, cookieOptions);
}
*/