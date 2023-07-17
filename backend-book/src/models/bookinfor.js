'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookInfor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BookInfor.hasOne(models.Book, { foreignKey: 'keyMap', as: 'BookInfoData' })

        }
    }
    BookInfor.init({
        bookId: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkDown: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'BookInfor',
    });
    return BookInfor;
};