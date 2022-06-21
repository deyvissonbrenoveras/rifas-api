import { Model, DataTypes } from "sequelize";

class Raffle extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        quotaQuantity: DataTypes.INTEGER,
        quotaExpirationDate: DataTypes.DATE,
        quotaPrice: DataTypes.DOUBLE,
        allowedQuotasPerPurchase: DataTypes.INTEGER,
        status: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        firstImageId: DataTypes.INTEGER,
        secondImageId: DataTypes.INTEGER,
        thirdImageId: DataTypes.INTEGER,
      },
      { sequelize, tableName: "raffles" }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Image, {
      foreignKey: "firstImageId",
      as: "firstImage",
    });
    this.belongsTo(models.Image, {
      foreignKey: "secondImageId",
      as: "secondImage",
    });
    this.belongsTo(models.Image, {
      foreignKey: "thirdImageId",
      as: "thirdImage",
    });
  }
}

export default Raffle;
