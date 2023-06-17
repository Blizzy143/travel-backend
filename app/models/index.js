
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
db.User = require('./user.model.js')(sequelize, Sequelize);
db.Session = require('./session.model.js')(sequelize, Sequelize);
db.Trip = require('./trip.model.js')(sequelize, Sequelize);
db.Itinerary = require('./itenerary.model.js')(sequelize, Sequelize);
db.trip_user = require("./trip_users.model.js")(sequelize, Sequelize);
db.itinary_place = require("./itinary_places.model.js")(sequelize, Sequelize);

//relationship between destination and place

db.Destination.hasMany(db.Place, { foreignKey: 'destination_id' });
db.Place.belongsTo(db.Destination, { foreignKey: 'destination_id' });

//relationship between Destination and hotel
db.Destination.hasMany(db.Hotel, { foreignKey: 'destination_id' });
db.Hotel.belongsTo(db.Destination, { foreignKey: 'destination_id' });

// relationship between user and session
// foreign key for session
db.User.hasMany(
  db.Session,
  { as: "Session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.Session.belongsTo(
  db.User,
  { as: "User" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);



// relationship between destination and trip
db.Destination.hasMany(db.Trip, { foreignKey: 'destination_id' });
db.Trip.belongsTo(db.Destination, { foreignKey: 'destination_id' });



// relationship between trip and user
db.User.belongsToMany(db.Trip, { through: "trip_users" });
db.Trip.belongsToMany(db.User, { through: "trip_users" });


// relationship between trip and itinerary
db.Trip.hasMany(db.Itinerary, { foreignKey: 'trip_id' });
db.Itinerary.belongsTo(db.Trip, { foreignKey: 'trip_id' });


// relationship between place and itinerary
db.Place.belongsToMany(db.Itinerary, { through: 'itinary_places' });
db.Itinerary.belongsToMany(db.Place, { through: 'itinary_places' });

// relationship between hotel and itinerary

db.Hotel.hasMany(db.Itinerary, { foreignKey: 'hotel_id' });
db.Itinerary.belongsTo(db.Hotel, { foreignKey: 'hotel_id' });


module.exports = db;