'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HoaDon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HoaDon.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'UserData' });
            HoaDon.belongsTo(models.allCode, { foreignKey: 'status', targetKey: 'keyMap', as: 'statusData' })

        }
    }
    HoaDon.init({
        userId: DataTypes.INTEGER,
        tongTien: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'HoaDon',
    });
    return HoaDon;
};