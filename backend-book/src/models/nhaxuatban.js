'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nhaxuatban extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            nhaxuatban.hasMany(models.Book, { foreignKey: 'nhaXuatBan', sourceKey: 'keyMap', as: 'BookData' })

        }
    }
    nhaxuatban.init({
        keyMap: DataTypes.STRING,
        tenNXB: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'nhaxuatban',
    });
    return nhaxuatban;
};