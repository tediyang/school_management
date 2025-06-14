'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  School.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT, // DOUBLE is preferred for coordinates for precison but the task requires FLOAT
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT, // DOUBLE is preferred for coordinates for precision but the task requires FLOAT
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};
