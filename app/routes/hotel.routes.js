const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller.js');

// Get all hotels
router.get('/', hotelController.getAllHotels);

// Get a single hotel by ID
router.get('/:hotelId', hotelController.getHotelById);

// Create a new hotel
router.post('/', hotelController.createHotel);

// Update a hotel
router.put('/:hotelId', hotelController.updateHotel);

// Delete a hotel
router.delete('/:hotelId', hotelController.deleteHotel);

module.exports = router;
