'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class allCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            allCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            allCode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })
            allCode.hasMany(models.Book, { foreignKey: 'sanPham', as: 'sanPhamData' })

        }
    }
    allCode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        value: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'allCode',
    });
    return allCode;
};