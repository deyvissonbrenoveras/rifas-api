"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quotas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      raffleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "raffles",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      reservationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("quotas");
  },
};
