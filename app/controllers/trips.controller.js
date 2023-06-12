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

exports.getTrips = async (req, res) => {
  try {
    const { userId, destinationId } = req.query;
    console.log("request =============" +req.params)
    console.log('user id ======>' + userId);
    console.log('destination id ======>' + destinationId);
    const trips = await Trip.findAll({ where: { user_id: req.params.userId, destination_id: req.params.destinationId } });
    res.json(trips);
  } catch (error) {
    console.log("fetch trips error===>" +error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id, destinationId: req.query.destinationId } });
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip details' });
  }
};


// Create a new trip
exports.createTrip = async (req, res) => {
  console.log(req.body);
  try {
    const { name, destinationId, userId, start_date, end_date } = req.body;

    const destination = await Destination.findByPk(destinationId);
    const user = await User.findByPk(userId);


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const trip = await Trip.create({ name: name, start_date: start_date, end_date: end_date, destination_id: destinationId, user_id: userId });

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
