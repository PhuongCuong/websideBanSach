'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tenSach: {
                type: Sequelize.STRING
            },
            nhaCungCap: {
                type: Sequelize.STRING
            },
            nhaXuatBan: {
                type: Sequelize.STRING
            },
            tacGia: {
                type: Sequelize.STRING
            },
            gia: {
                type: Sequelize.STRING
            },
            theLoai: {
                type: Sequelize.STRING
            },
            keyMap: {
                type: Sequelize.STRING
            },
            soLuong: {
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.BLOB('long')
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
        await queryInterface.dropTable('Books');
    }
};