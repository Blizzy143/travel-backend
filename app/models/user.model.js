const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    user_type: {
       type: DataTypes.STRING,
       allowNull: false,
       defaultValue: 'user',
    },      
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
  });
  return User;
}