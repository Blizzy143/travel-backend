// controllers/destinations.js
const { Destination } = require('../models');

// Get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    return res.json(destinations);
  } catch (error) {
    console.error('Error in getting destinations:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a destination by ID
const getDestinationById = async (req, res) => {

  console.log('params ======> '+ req.params);
  try {
    const { id } = req.params;
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    console.log('destination =====>' + destination)
    return res.json(destination);
  } catch (error) {
    console.error('Error in getting destination by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new destination
const createDestination = async (req, res) => {
  try {
    const { name, description, rating , image} = req.body;
    const newDestination = await Destination.create({ name, description, rating , image});
    return res.status(201).json(newDestination);
  } catch (error) {
    console.error('Error in creating destination:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a destination by ID
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, rating , image} = req.body;
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    destination.name = name;
    destination.description = description;
    destination.rating = rating;
    await destination.save();
    return res.json(destination);
  } catch (error) {
    console.error('Error in updating destination:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a destination by ID
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    await destination.destroy();
    return res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error in deleting destination:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
