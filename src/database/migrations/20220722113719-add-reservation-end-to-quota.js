"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("raffles", "quotaExpirationDate");
    await queryInterface.removeColumn("quotas", "paid");
    await queryInterface.removeColumn("quotas", "reservationDate");

    await queryInterface.addColumn("raffles", "quotaExpirationInDays", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn("orders", "paid", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
    await queryInterface.addColumn("orders", "reservationExpiration", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "reservationExpiration");
    await queryInterface.removeColumn("orders", "paid");
    await queryInterface.removeColumn("raffles", "quotaExpirationInDays");

    await queryInterface.addColumn("raffles", "quotaExpirationDate", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
    await queryInterface.addColumn("quotas", "paid", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn("quotas", "reservationDate", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
