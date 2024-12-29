'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const genUuid = uuidv4();
    const genUuid2 = uuidv4();
    await queryInterface.bulkInsert('companies', [{
      uuid: genUuid,
      email: 'john@gmail.com',
      password: '123456',
      company_name: 'John Doe',
      address: '123 Main St',
      contactPhone: '000000000000',
      industry: 'Boiling',
      registrationNumber: '123467890',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: genUuid2,
      email: 'john.doe@gmail.com',
      password: '1234w56',
      company_name: 'Jane Doe',
      address: '124 Main St',
      contactPhone: '001000000000',
      industry: 'Cooking',
      registrationNumber: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('companies', null, {});
  }
};
