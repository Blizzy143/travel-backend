const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips.controller.js');

// Get all trips
router.get('/trips', tripsController.getAllTrips);

// Create a new trip
router.post('/trips', tripsController.createTrip);

// Delete a trip
router.delete('/trips/:tripId', tripsController.deleteTrip);

module.exports = router;
