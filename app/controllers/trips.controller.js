const { Trip, Destination, User, Itinerary, Hotel, Place } = require('../models');


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
    console.log("request =============" + req.params)
    console.log('user id ======>' + userId);
    console.log('destination id ======>' + destinationId);
    const trips = await Trip.findAll({ where: { user_id: req.params.userId, destination_id: req.params.destinationId } });
    res.json(trips);
  } catch (error) {
    console.log("fetch trips error===>" + error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};


// Get trip by destination id
exports.getTripByDestinationId = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const trips = await Trip.findAll({ where: { destination_id: destinationId } });
    res.json(trips);
  } catch (error) {
    console.log("fetch trips error===>" + error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};


exports.getTripById = async (req, res) => {

  try {
    const tripId = req.params.id;
    const trip = await Trip.findByPk(tripId, {
      include: [
        {
          model: Itinerary,
          include: [
            { model: Hotel },
            { model: Place },
          ]
        }
      ],
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error('Error retrieving trip by id:', error);
    res.status(500).json({ message: 'An error occurred while retrieving trip by id' });
  }
};


// Create a new trip
exports.createTrip = async (req, res) => {
  console.log(req.body);
  try {
    const { name, destination_id, start_date, end_date } = req.body;

    const destination = await Destination.findByPk(destination_id);

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const trip = await Trip.create({ name: name, start_date: start_date, end_date: end_date, destination_id: destination_id });

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


// Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, destination_id, user_id, start_date, end_date } = req.body;

    const trip = await Trip.findByPk(tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const destination = await Destination.findByPk(destination_id);

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    trip.name = name;
    trip.start_date = start_date;
    trip.end_date = end_date;
    trip.destination_id = destination_id;

    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'An error occurred while updating the trip' });
  }
}


exports.addUserToTrip = async (req, res) => {
  const { tripId, userId } = req.params;
  try {
    const trip = await Trip.findByPk(tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await trip.addUser(user);

    res.status(200).json({ message: 'User added to trip successfully' });
  }
  catch (error) {
    console.error('Error adding user to trip:', error);
    res.status(500).json({ message: 'An error occurred while adding user to trip' });
  }

}

exports.removeUserFromTrip = async (req, res) => {
  const { tripId, userId } = req.params;
  try {
    const trip = await Trip.findByPk(tripId);
    const user = await User.findByPk(userId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await trip.removeUser(user);

    res.status(200).json({ message: 'User removed from trip successfully' });
  }
  catch (error) {
    console.error('Error removing user from trip:', error);
    res.status(500).json({ message: 'An error occurred while removing user from trip' });
  }

}

exports.getTripsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    const trips = await user.getTrips({
      include: [
        { model: Destination }
      ]
    });
    res.json(trips);
  } catch (error) {
    console.log("fetch trips error===>" + error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
}

