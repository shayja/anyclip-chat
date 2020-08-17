const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.secret, {
    host: 'localhost',
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
});

const ChatMessage = sequelize.define('messages', {
    user_id:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });


try {
    sequelize.authenticate();
    console.log('Connection to mysql has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = {
    User,
    ChatMessage
};
