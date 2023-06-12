const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips.controller.js');

// Get all trips
router.get('/', tripsController.getAllTrips);

// Get all trips
router.get('/:id', tripsController.getTripById);

// Create a new trip
router.post('/', tripsController.createTrip);

// Delete a trip
router.delete('/:tripId', tripsController.deleteTrip);

module.exports = router;
