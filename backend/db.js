const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.secret, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql'
  });

const User = sequelize.define('users', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  avatar: {
    type: Sequelize.STRING
  },
  ipAddress: {
    type: Sequelize.STRING
  }
}, {
  // Other model options go here
  indexes: [{ unique: true, fields: ['name'] }]
})

const ChatMessage = sequelize.define('messages', {
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });


  User.hasMany(ChatMessage);
  ChatMessage.belongsTo(User);


  sequelize.authenticate()
  .then(() => {
    console.log('Sequelize has established mysql connection successfully.');
  })
  .catch(err => {
    console.error('Sequelize was unable to connect to the database:', err);
  });
   


// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = {
    User,
    ChatMessage,
    sequelize
};
