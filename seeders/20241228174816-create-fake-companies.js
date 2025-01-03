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
    },
    {
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
    }, {
      uuid: uuidv4(),
      email: 'sarah.smith@gmail.com',
      password: 'pass123',
      company_name: 'Smith Industries',
      address: '789 Oak Road',
      contactPhone: '002000000000',
      industry: 'Manufacturing',
      registrationNumber: '987654321',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'mike.jones@gmail.com',
      password: 'secure456',
      company_name: 'Jones Electronics',
      address: '456 Pine Avenue',
      contactPhone: '003000000000',
      industry: 'Electronics',
      registrationNumber: '456789123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'amy.wilson@gmail.com',
      password: 'wilson789',
      company_name: 'Wilson Consulting',
      address: '321 Maple Drive',
      contactPhone: '004000000000',
      industry: 'Consulting',
      registrationNumber: '789123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'peter.brown@gmail.com',
      password: 'brown321',
      company_name: 'Brown Solutions',
      address: '654 Cedar Lane',
      contactPhone: '005000000000',
      industry: 'IT Services',
      registrationNumber: '321654987',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'lisa.taylor@gmail.com',
      password: 'taylor567',
      company_name: 'Taylor Foods',
      address: '987 Birch Street',
      contactPhone: '006000000000',
      industry: 'Food Processing',
      registrationNumber: '654987321',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'david.miller@gmail.com',
      password: 'miller890',
      company_name: 'Miller Construction',
      address: '147 Elm Court',
      contactPhone: '007000000000',
      industry: 'Construction',
      registrationNumber: '147258369',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'emma.davis@gmail.com',
      password: 'davis234',
      company_name: 'Davis Healthcare',
      address: '258 Spruce Way',
      contactPhone: '008000000000',
      industry: 'Healthcare',
      registrationNumber: '258369147',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'james.white@gmail.com',
      password: 'white567',
      company_name: 'White Logistics',
      address: '369 Ash Boulevard',
      contactPhone: '009000000000',
      industry: 'Logistics',
      registrationNumber: '369147258',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      email: 'sophia.green@gmail.com',
      password: 'green789',
      company_name: 'Green Energy',
      address: '741 Willow Place',
      contactPhone: '010000000000',
      industry: 'Renewable Energy',
      registrationNumber: '741852963',
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
