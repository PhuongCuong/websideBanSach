'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // tenSach: DataTypes.STRING,
    //     maSach: DataTypes.STRING,
    //     discount: DataTypes.INTEGER,
    //     ngayBD: DataTypes.STRING,
    //     ngayKT: DataTypes.STRING
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('discounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tenSach: {
                type: Sequelize.STRING
            },
            maSach: {
                type: Sequelize.STRING
            },
            discount: {
                type: Sequelize.FLOAT
            },
            ngayBD: {
                type: Sequelize.STRING
            },
            ngayKT: {
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
        await queryInterface.dropTable('discounts');
    }
};