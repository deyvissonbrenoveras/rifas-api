"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("quotas", "reservationExpiration", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.removeColumn("raffles", "quotaExpirationDate");
    await queryInterface.addColumn("raffles", "quotaExpirationInDays", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("quotas", "reservationExpiration");
    await queryInterface.addColumn("raffles", "quotaExpirationDate", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.removeColumn("raffles", "quotaExpirationInDays");
  },
};
