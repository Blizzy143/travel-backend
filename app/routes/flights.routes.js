const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights.controller.js');

// Get all flights
router.get('/flights', flightsController.getAllFlights);

// Search flights based on criteria
router.get('/flights', flightsController.searchFlights);

// Get a single flight by ID
router.get('/flights/:flightId', flightsController.getFlightById);

// Create a new flight
router.post('/flights', flightsController.createFlight);

// Update a flight
router.put('/flights/:flightId', flightsController.updateFlight);

// Delete a flight
router.delete('/flights/:flightId', flightsController.deleteFlight);

module.exports = router;
