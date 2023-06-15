const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define('Place', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    return Place;
}


