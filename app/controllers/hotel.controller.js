const { Hotel } = require('../models');

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error retrieving hotels:', error);
    res.status(500).json({ message: 'An error occurred while retrieving hotels' });
  }
};

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error retrieving hotel:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the hotel' });
  }
};


// Create a new hotel
exports.createHotel = async (req, res) => {
  try {

    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);

  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ message: 'An error occurred while creating the hotel' });
  }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
  try {

    const { hotelId } = req.params;

    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    await hotel.update(req.body);

    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ message: 'An error occurred while updating the hotel' });
  }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    await hotel.destroy();

    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ message: 'An error occurred while deleting the hotel' });
  }
};
