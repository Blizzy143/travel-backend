const express = require('express');
const router = express.Router();
const itineraryItemsController = require('../controllers/iteneraryItems.controller.js');

// Get all itinerary items for a specific itinerary
router.get('/itineraries/:itineraryId/itinerary-items', itineraryItemsController.getAllItineraryItems);

// Create a new itinerary item for a specific itinerary
router.post('/itineraries/:itineraryId/itinerary-items', itineraryItemsController.createItineraryItem);

// Update an itinerary item
router.put('/itineraries/:itineraryId/itinerary-items/:itineraryItemId', itineraryItemsController.updateItineraryItem);

// Delete an itinerary item
router.delete('/itineraries/:itineraryId/itinerary-items/:itineraryItemId', itineraryItemsController.deleteItineraryItem);

module.exports = router;
