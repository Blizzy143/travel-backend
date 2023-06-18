const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips.controller.js');

// Get all trips
router.get('/', tripsController.getAllTrips);

// Get all trips
router.get('/:id', tripsController.getTripById);

// Get all trips by destination id
router.get('/destination/:destinationId', tripsController.getTripByDestinationId);

//Add user to trip
router.post('/:tripId/users/:userId', tripsController.addUserToTrip);
// Remove user from trip
router.delete('/:tripId/users/:userId', tripsController.removeUserFromTrip);



// Create a new trip
router.post('/', tripsController.createTrip);

// Update a trip
router.put('/:tripId', tripsController.updateTrip);

// Delete a trip
router.delete('/:tripId', tripsController.deleteTrip);

// Get all trips by user id
router.get('/user/:userId', tripsController.getTripsByUserId);


module.exports = router;
