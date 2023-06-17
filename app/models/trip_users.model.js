const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const TripUser = sequelize.define("trip_users", {
    selfGranted: DataTypes.BOOLEAN
  }, { timestamps: false });
  return TripUser;
};
