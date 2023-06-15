
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");



const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Include the model files
db.Destination = require('./destination.model.js')(sequelize, Sequelize);
db.Place = require('./place.model.js')(sequelize, Sequelize);
db.Hotel = require('./hotel.model.js')(sequelize, Sequelize);


//relationship between destination and place

db.Destination.hasMany(db.Place, { foreignKey: 'destination_id' });
db.Place.belongsTo(db.Destination, { foreignKey: 'destination_id' });

//relationship between Destination and hotel
db.Destination.hasMany(db.Hotel, { foreignKey: 'destination_id' });
db.Hotel.belongsTo(db.Destination, { foreignKey: 'destination_id' });


module.exports = db;