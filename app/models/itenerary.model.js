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

  return Itinerary;
}
