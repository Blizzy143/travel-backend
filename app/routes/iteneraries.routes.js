const express = require('express');
const router = express.Router();
const itinerariesController = require('../controllers/iteneraries.controller.js');

// Get all itineraries
router.get('/', itinerariesController.getAllItineraries);

// Get a single itinerary by ID
router.get('/:itineraryId', itinerariesController.getItineraryById);

// Create a new itinerary
router.post('/', itinerariesController.createItinerary);

// Update an itinerary
router.put('/:itineraryId', itinerariesController.updateItinerary);

// Delete an itinerary
router.delete('/:itineraryId', itinerariesController.deleteItinerary);

//Add a place to an itinerary
router.post('/:itineraryId/places/:placeId', itinerariesController.addPlaceToItinerary);


module.exports = router;
