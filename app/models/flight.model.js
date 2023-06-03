const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define('Flight', {
        flight_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    const Trip = require('./trip.model.js')(sequelize, Sequelize);
    Flight.belongsTo(Trip, { foreignKey: 'trip_id' });
    
    return Flight;
}
