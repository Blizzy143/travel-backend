const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller.js');

// Get all places
router.get('/', placeController.getAllPlaces);

// Get a single place by ID
router.get('/:placeId', placeController.getPlaceById);

// Create a new place
router.post('/', placeController.createPlace);

// Update a place
router.put('/:placeId', placeController.updatePlace);

// Delete a place
router.delete('/:placeId', placeController.deletePlace);

module.exports = router;
