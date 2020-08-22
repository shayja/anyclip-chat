const express = require('express');
const router = express.Router();
const messageService = require('./message.service');
const { parseEnvNumber } = require('../config/index');
const authorize = require('../middleware/authorize');

// routes
router.post('/save', authorize, saveMessage);
router.get('/get-latest', authorize, getLatest);

module.exports = router;

function saveMessage(req, res, next) {

    const { message } = req.body;
    const { user } = req;

    if (user && user.id && message){
        messageService.save({ userId: user.id, message })
        .then((sucess) => {
            res.json(sucess);
        })
        .catch(next);
    } else {
        throw new Error('One of the details is missing.');
    }
}

function getLatest(req, res, next) {
    messageService.getLatest(parseEnvNumber("HOW_MANY_CHAT_MESSAGES"))
    .then((data) => {
        // I need the latest rows from the data source but the sort should be by id asc.
        // In sql I would write a query like this: 
        // SELECT t.* FROM (SELECT * FROM `messages` ORDER BY `id` DESC LIMIT 10) t ORDER BY t.`id` ASC
        res.json(data.reverse());
    })
    .catch(next);
}

