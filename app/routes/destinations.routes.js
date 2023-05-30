const express = require('express');
const destinationsController = require("../controllers/destinations.controller.js");

const router = express.Router();

router.get('/', destinationsController.getAllDestinations);
router.get('/:id', destinationsController.getDestinationById);
router.post('/', destinationsController.createDestination);
router.put('/:id', destinationsController.updateDestination);
router.delete('/:id', destinationsController.deleteDestination);

module.exports = router;
