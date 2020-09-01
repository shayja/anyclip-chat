module.exports = app => {
    app.use('/accounts', require('./accounts/account.controller'));
    app.use('/messages', require('./messages/message.controller'));
};
