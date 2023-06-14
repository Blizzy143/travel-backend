const { Place } = require('../models');

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.findAll();
    res.status(200).json(places);
  } catch (error) {
    console.error('Error retrieving places:', error);
    res.status(500).json({ message: 'An error occurred while retrieving places' });
  }
};

// Get a single place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const { placeId } = req.params;

    const place = await Place.findByPk(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json(place);
  } catch (error) {
    console.error('Error retrieving place:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the place' });
  }
};


// Create a new place
exports.createPlace = async (req, res) => {
  try {

    const place = await Place.create(req.body);
    res.status(201).json(place);

  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ message: 'An error occurred while creating the place' });
  }
};

// Update a place
exports.updatePlace = async (req, res) => {
  try {

    const { placeId } = req.params;

    const place = await Place.findByPk(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    await place.update(req.body);

    res.status(200).json(place);
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ message: 'An error occurred while updating the place' });
  }
};

// Delete a place
exports.deletePlace = async (req, res) => {
  try {
    const { placeId } = req.params;

    const place = await Place.findByPk(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    await place.destroy();

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ message: 'An error occurred while deleting the place' });
  }
};
