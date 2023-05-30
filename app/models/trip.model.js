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

  const User = require('./user.model.js')(sequelize, Sequelize);
  const Destination = require('./destination.model.js')(sequelize, Sequelize);

  Trip.belongsTo(User, { foreignKey: 'user_id' });
  Trip.belongsTo(Destination, { foreignKey: 'destination_id' });

  return Trip;
}
