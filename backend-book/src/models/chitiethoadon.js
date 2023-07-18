'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChitietHoaDon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ChitietHoaDon.init({
        hoaDonId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
        soLuong: DataTypes.INTEGER,
        thanhTien: DataTypes.STRING,
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'ChitietHoaDon',
    });
    return ChitietHoaDon;
};