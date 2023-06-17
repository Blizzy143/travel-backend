const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const ItinaryPlace = sequelize.define("itinary_places", {
    selfGranted: DataTypes.BOOLEAN
  }, { timestamps: false });
  return ItinaryPlace;
};
