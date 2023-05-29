const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Trip = sequelize.define('Trip', {
    trip_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Trip;
}
