'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            discount.hasOne(models.Book, { foreignKey: 'keyMap', as: 'discountData' })


        }
    }
    discount.init({
        tenSach: DataTypes.STRING,
        maSach: DataTypes.STRING,
        discount: DataTypes.FLOAT,
        ngayBD: DataTypes.STRING,
        ngayKT: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'discount',
    });
    return discount;
};