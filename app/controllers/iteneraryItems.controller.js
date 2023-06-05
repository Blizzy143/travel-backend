const { ItineraryItem, Destination } = require('../models');

// Get all itinerary items for a specific itinerary
exports.getAllItineraryItems = async (req, res) => {
  try {
    const { itineraryId } = req.params;

    const itineraryItems = await ItineraryItem.findAll({
      where: { itineraryId },
      include: [Destination],
    });

    res.status(200).json(itineraryItems);
  } catch (error) {
    console.error('Error getting itinerary items:', error);
    res.status(500).json({ message: 'An error occurred while getting itinerary items' });
  }
};

// Create a new itinerary item for a specific itinerary
exports.createItineraryItem = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const { title, description, startDate, endDate, destinationId } = req.body;

    const itineraryItem = await ItineraryItem.create({
      title,
      description,
      startDate,
      endDate,
      destinationId,
      itineraryId,
    });

    res.status(201).json(itineraryItem);
  } catch (error) {
    console.error('Error creating itinerary item:', error);
    res.status(500).json({ message: 'An error occurred while creating itinerary item' });
  }
};

// Update an itinerary item
exports.updateItineraryItem = async (req, res) => {
  try {
    const { itineraryItemId } = req.params;
    const { title, description, startDate, endDate, destinationId } = req.body;

    const itineraryItem = await ItineraryItem.findByPk(itineraryItemId);

    if (!itineraryItem) {
      return res.status(404).json({ message: 'Itinerary item not found' });
    }

    itineraryItem.title = title;
    itineraryItem.description = description;
    itineraryItem.startDate = startDate;
    itineraryItem.endDate = endDate;
    itineraryItem.destinationId = destinationId;

    await itineraryItem.save();

    res.status(200).json(itineraryItem);
  } catch (error) {
    console.error('Error updating itinerary item:', error);
    res.status(500).json({ message: 'An error occurred while updating itinerary item' });
  }
};

// Delete an itinerary item
exports.deleteItineraryItem = async (req, res) => {
  try {
    const { itineraryItemId } = req.params;

    const itineraryItem = await ItineraryItem.findByPk(itineraryItemId);

    if (!itineraryItem) {
      return res.status(404).json({ message: 'Itinerary item not found' });
    }

    await itineraryItem.destroy();

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting itinerary item:', error);
    res.status(500).json({ message: 'An error occurred while deleting itinerary item' });
  }
};
