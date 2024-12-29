'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'uuid' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, uuid: undefined }
    }
  }
  Profile.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    course_of_study: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    career_goals: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles'
  });
  return Profile;
};