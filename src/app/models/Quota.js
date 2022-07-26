import { Model, DataTypes } from "sequelize";

class Quota extends Model {
  static init(sequelize) {
    super.init(
      {
        number: DataTypes.STRING,
        raffleId: DataTypes.INTEGER,
        orderId: DataTypes.INTEGER,
        available: {
          type: DataTypes.VIRTUAL,
          get() {
            return true;
          },
        },
      },
      { sequelize, tableName: "quotas" }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Raffle, {
      foreignKey: "raffleId",
    });
    this.belongsTo(models.Order, {
      foreignKey: "orderId",
      as: "order",
    });
  }
}

export default Quota;
