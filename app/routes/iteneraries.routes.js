const express = require('express');
const router = express.Router();
const itinerariesController = require('../controllers/iteneraries.controller.js');

// Get all itineraries
router.get('/itineraries', itinerariesController.getAllItineraries);

// Get a single itinerary by ID
router.get('/itineraries/:itineraryId', itinerariesController.getItineraryById);

// Create a new itinerary
router.post('/itineraries', itinerariesController.createItinerary);

// Update an itinerary
router.put('/itineraries/:itineraryId', itinerariesController.updateItinerary);

// Delete an itinerary
router.delete('/itineraries/:itineraryId', itinerariesController.deleteItinerary);

module.exports = router;
