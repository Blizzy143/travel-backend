const { Trip, Destination, User } = require('../models');

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [{ model: Destination }, { model: User }],
    });

    res.status(200).json(trips);
  } catch (error) {
    console.error('Error retrieving trips:', error);
    res.status(500).json({ message: 'An error occurred while retrieving trips' });
  }
};

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const { destinationId, userId } = req.body;

    const destination = await Destination.findByPk(destinationId);
    const user = await User.findByPk(userId);

    if (!destination || !user) {
      return res.status(404).json({ message: 'Destination or user not found' });
    }

    const trip = await Trip.create({ destinationId, userId });

    res.status(201).json(trip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ message: 'An error occurred while creating the trip' });
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await trip.destroy();

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ message: 'An error occurred while deleting the trip' });
  }
};
