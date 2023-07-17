'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class theloai extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            theloai.hasMany(models.Book, { foreignKey: 'theLoai', sourceKey: 'keyMap', as: 'BookData' })
        }
    }
    theloai.init({
        keyMap: DataTypes.STRING,
        theLoai: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'theloai',
    });
    return theloai;
};