const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Itinerary = sequelize.define('Itinerary', {
    itinerary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  const Trip = require('./trip.model.js')(sequelize, Sequelize);
  
  Itinerary.belongsTo(Trip, { foreignKey: 'trip_id' });
  
  return Itinerary;
}
