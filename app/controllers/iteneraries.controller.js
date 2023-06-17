const { Itinerary, ItineraryItem, Destination, Place } = require('../models');

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error getting itineraries:', error);
    res.status(500).json({ message: 'An error occurred while getting itineraries' });
  }
};

// Get a single itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const { itineraryId } = req.params;

    const itinerary = await Itinerary.findByPk(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error getting itinerary:', error);
    res.status(500).json({ message: 'An error occurred while getting the itinerary' });
  }
};

// Create a new itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { date, trip_id } = req.body;

    const itinerary = await Itinerary.create({ date, trip_id });

    res.status(201).json(itinerary);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'An error occurred while creating the itinerary' });
  }
};

// Update an itinerary
exports.updateItinerary = async (req, res) => {
  try {
    const { itineraryId } = req.params;

    const itinerary = await Itinerary.findByPk(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
      itinerary.place_id = req.body.place_id;
      itinerary.hotel_id = req.body.hotel_id;

    await itinerary.save();

    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error updating itinerary:', error);
    res.status(500).json({ message: 'An error occurred while updating the itinerary' });
  }
};

// Delete an itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const { itineraryId } = req.params;

    const itinerary = await Itinerary.findByPk(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    await itinerary.destroy();

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).json({ message: 'An error occurred while deleting the itinerary' });
  }
};


exports.addPlaceToItinerary = async (req, res) => {
 const { itineraryId, placeId } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(itineraryId);
    const place = await Place.findByPk(placeId);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    await itinerary.addPlace(place);

    res.status(200).json(itinerary);
  }
  catch (error) {
    console.error('Error adding place to itinerary:', error);
    res.status(500).json({ message: 'An error occurred while adding place to itinerary' });
  }
}