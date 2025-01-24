'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      company_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      additional_information: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM("Under Review", "Accepted", "Declined"),
        allowNull: false,
        defaultValue: "Under Review"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applications');
  }
};