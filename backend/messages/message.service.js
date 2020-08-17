const {ChatMessage} = require('../db');

const save = async ({ userId, message }) => {
    try {
        // Create a new user
    await ChatMessage.create({ user_id: userId, message: message });

    } catch (error) {
        if (error){
            console.log('ChatMessage.create error: ', error);
            throw new Error('Db error');
        }
    }
    return true;
}


const getLatest = async (howManyRows) => {
    return ChatMessage.findAll({ 
        limit: howManyRows,
        order: [['id', 'DESC']]
    })
}


module.exports = {
    save,
    getLatest
};
