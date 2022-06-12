"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("images", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("images");
  },
};
