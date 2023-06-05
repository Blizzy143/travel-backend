const { Itinerary, ItineraryItem, Destination } = require('../models');

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      include: [
        {
          model: ItineraryItem,
          include: [Destination],
        },
      ],
    });

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

    const itinerary = await Itinerary.findByPk(itineraryId, {
      include: [
        {
          model: ItineraryItem,
          include: [Destination],
        },
      ],
    });

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
    const { title, description } = req.body;

    const itinerary = await Itinerary.create({ title, description });

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
    const { title, description } = req.body;

    const itinerary = await Itinerary.findByPk(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itinerary.title = title;
    itinerary.description = description;

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
