require("dotenv").config();
const bodyParser = require('body-parser');

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const authRoutes = require("./app/routes/auth.routes.js");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.json());


const authRouter = require("./app/routes/auth.routes.js");
const destinationsRouter = require("./app/routes/destinations.routes.js");
const tripsRouter = require("./app/routes/trips.routes.js")
const flightsRouter = require("./app/routes/flights.routes.js")
const itenerariesRouter = require("./app/routes/iteneraries.routes.js")
const iteneraryItemsRouter = require("./app/routes/iteneraryItems.routes.js")
const userRouter = require("./app/routes/user.routes.js")

app.use('/auth', authRouter)
app.use('/destinations', destinationsRouter)
app.use('/trips', tripsRouter)
app.use('/flights', flightsRouter)
app.use('/iteneraries', itenerariesRouter)
app.use('/iteneraryItems', iteneraryItemsRouter)
app.use('/users', userRouter)

// set port, listen for requests
const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
