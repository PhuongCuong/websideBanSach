'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Book.belongsTo(models.nhaxuatban, { foreignKey: 'nhaXuatBan', targetKey: 'keyMap', as: 'nhaxuatbanData' })
            Book.belongsTo(models.nhacungcap, { foreignKey: 'nhaCungCap', targetKey: 'keyMap', as: 'nhacungcapData' })
            Book.belongsTo(models.theloai, { foreignKey: 'theLoai', targetKey: 'keyMap', as: 'theloaiData' })
            Book.belongsTo(models.discount, { foreignKey: 'keyMap', targetKey: 'maSach', as: 'discountData' })
            Book.belongsTo(models.BookInfor, { foreignKey: 'keyMap', targetKey: 'bookId', as: 'BookInfoData' })
            Book.belongsTo(models.allCode, { foreignKey: 'sanPham', targetKey: 'keyMap', as: 'sanPhamData' })
            Book.hasOne(models.ChitietHoaDon, { foreignKey: 'bookId', targetKey: 'keyMap', as: 'ChiTietHoaDonData' })
        }
    }
    Book.init({
        tenSach: DataTypes.STRING,
        nhaCungCap: DataTypes.STRING,
        nhaXuatBan: DataTypes.STRING,
        tacGia: DataTypes.STRING,
        gia: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        theLoai: DataTypes.STRING,
        soLuong: DataTypes.INTEGER,
        image: DataTypes.TEXT,
        sanPham: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Book',
    });
    return Book;
};