'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // keyMap: DataTypes.STRING,
    // type: DataTypes.STRING,
    // value: DataTypes.STRING,
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('allCodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            keyMap: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            value: {
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
        await queryInterface.dropTable('allCodes');
    }
};