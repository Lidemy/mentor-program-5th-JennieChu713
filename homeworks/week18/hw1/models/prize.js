'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prize.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prize',
  });
  return Prize;
};