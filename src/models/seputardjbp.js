'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seputardjbp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  seputardjbp.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    id_admin:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'seputardjbp',
  });
  return seputardjbp;
};