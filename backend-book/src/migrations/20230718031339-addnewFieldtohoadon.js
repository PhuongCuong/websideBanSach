'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('HoaDons', 'status', {
      type: Sequelize.STRING,
      allowNull: true // Hoặc false tùy theo yêu cầu của bạn
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('HoaDons', 'status');
  }
};
