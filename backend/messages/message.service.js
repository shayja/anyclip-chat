const {ChatMessage, User} = require('../db');

const save = async ({ userId, message }) => {
    try {
        // Create a new user
    await ChatMessage.create({ userId: userId, message: message });

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
        include: [{
            model: User,
            as: 'user',
            attributes: ['username', 'avatar']     
        }],
        attributes: ['message', 'createdAt'] ,
        limit: howManyRows,
        order: [['id', 'DESC']]
    }) || [];
}


module.exports = {
    save,
    getLatest
};
