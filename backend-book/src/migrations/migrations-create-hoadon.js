'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // userId: DataTypes.STRING,
    // tongTien: DataTypes.STRING,
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('HoaDons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            },
            tongTien: {
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
        await queryInterface.dropTable('HoaDons');
    }
};