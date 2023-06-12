const { Flight } = require('../models');

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll();

    res.status(200).json(flights);
  } catch (error) {
    console.error('Error retrieving flights:', error);
    res.status(500).json({ message: 'An error occurred while retrieving flights' });
  }
};

// Get a single flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const { flightId } = req.params;

    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(flight);
  } catch (error) {
    console.error('Error retrieving flight:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the flight' });
  }
};
// Search flights based on criteria
exports.searchFlights = async (req, res) => {
  try {
    const { departureCity, arrivalCity, date } = req.query;

    const flights = await Flight.findAll({
      where: { departureCity, arrivalCity, date },
    });

    res.status(200).json(flights);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ message: 'An error occurred while searching flights' });
  }
};

// Create a new flight
exports.createFlight = async (req, res) => {
  try {
    const { departureCity, arrivalCity, date } = req.body;

    const flight = await Flight.create({ departureCity, arrivalCity, date });

    res.status(201).json(flight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ message: 'An error occurred while creating the flight' });
  }
};

// Update a flight
exports.updateFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    const { departureCity, arrivalCity, date } = req.body;

    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    flight.departureCity = departureCity;
    flight.arrivalCity = arrivalCity;
    flight.date = date;

    await flight.save();

    res.status(200).json(flight);
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ message: 'An error occurred while updating the flight' });
  }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
  try {
    const { flightId } = req.params;

    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    await flight.destroy();

    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ message: 'An error occurred while deleting the flight' });
  }
};
