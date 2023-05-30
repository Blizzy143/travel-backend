const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const ItineraryItem = sequelize.define('ItineraryItem', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  const Itinerary = require('./itenerary.model.js')(sequelize, Sequelize);
  ItineraryItem.belongsTo(Itinerary, { foreignKey: 'itinerary_id' });

  return ItineraryItem;
}
