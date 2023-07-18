'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ChitietHoaDons', 'image', {
      type: Sequelize.TEXT,
      allowNull: true // Hoặc false tùy theo yêu cầu của bạn
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ChitietHoaDons', 'image');
  }
};
