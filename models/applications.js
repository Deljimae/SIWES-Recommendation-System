'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applications.belongsTo(models.Company, {
        foreignKey: 'company_uuid',
        targetKey: 'uuid',
        as: 'company'
      });
    }
  }
  // You might want to consider adding:
  // - createdAt and updatedAt timestamps (though Sequelize adds these by default)
  // - Indexes on company_uuid and user_uuid for better query performance
  // - Any validation rules for additional_information
  // - Any custom instance or class methods
  Applications.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    company_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    additional_information: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM("Under Review", "Interviewed", "Declined"),
      allowNull: false,
      defaultValue: "Under Review"
    }
  }, {
    sequelize,
    modelName: 'Applications',
    tableName: 'applications',
    // Consider adding indexes:
    // indexes: [
    //   { fields: ['company_uuid'] },
    //   { fields: ['user_uuid'] }
    // ]
  });
  return Applications;
};