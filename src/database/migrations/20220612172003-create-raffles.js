"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("raffles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quotaExpirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quotaQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quotaPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      allowedQuotasPerPurchase: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      firstImageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      secondImageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      thirdImageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "images",
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
    await queryInterface.dropTable("raffles");
  },
};
