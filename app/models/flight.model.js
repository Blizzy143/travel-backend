const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define('Flight', {
        flight_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departure_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return Flight;
}
