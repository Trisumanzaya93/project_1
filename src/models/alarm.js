'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alarm.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    timer: DataTypes.DATE,
    id_admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alarm',
  });
  return Alarm;
};