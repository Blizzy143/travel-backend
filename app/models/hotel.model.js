const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define('Hotel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });
    
    return Hotel;
}
