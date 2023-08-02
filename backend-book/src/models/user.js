'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.allCode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.belongsTo(models.allCode, { foreignKey: 'roleId', targetKey: 'keyMap', as: 'roleData' })

      User.hasMany(models.HoaDon, { foreignKey: 'userId', sourceKey: 'id', as: 'HoaDonData' });

    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};