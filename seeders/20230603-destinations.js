'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the mock data for destinations
    const destinations = [
      {
        name: 'Paris',
        country: 'France',
        description: 'The City of Love',
        image: 'paris.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        description: 'The Land of the Rising Sun',
        image: 'tokyo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more destinations as needed
    ];

    // Insert the mock data into the "Destinations" table
    await queryInterface.bulkInsert('Destinations', destinations, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the mock data from the "Destinations" table
    await queryInterface.bulkDelete('Destinations', null, {});
  },
};
