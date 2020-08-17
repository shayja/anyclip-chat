const express = require('express');
const router = express.Router();
const accountService = require('./account.service');
const uploadBase64 = require('../fileupload');

const authenticate = (req, res, next) => {

    // console.log('req.body', req.body);

    const { username, avatar } = req.body;

    const account = {username, ipAddress: req.ip};

    const imageUploaded = (fileName) => {
        
        account.avatar = fileName;

        accountService.authenticate(account)
            .then((account) => {
                console.log(account);

                // setTokenCookie(res, refreshToken);
                res.json(account);
            })
            .catch(next);
    };

    uploadBase64(avatar, imageUploaded);   
}

// routes
router.post('/authenticate', authenticate);

module.exports = router;
