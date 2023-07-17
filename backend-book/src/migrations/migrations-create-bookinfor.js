'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // bookId: DataTypes.INTEGER,
    // descriptionHTML: DataTypes.TEXT('long'),
    // descriptionMarkDown: DataTypes.TEXT('long'),
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BookInfors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bookId: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionMarkDown: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('BookInfors');
    }
};