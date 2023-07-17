'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // hoaDonId: DataTypes.STRING,
    //     bookId: DataTypes.STRING,
    //     soLuong: DataTypes.INTEGER,
    //     thanhTien: DataTypes.STRING,
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ChitietHoaDons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            hoaDonId: {
                type: Sequelize.INTEGER
            },
            bookId: {
                type: Sequelize.INTEGER
            },
            soLuong: {
                type: Sequelize.INTEGER
            },
            thanhTien: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ChitietHoaDons');
    }
};