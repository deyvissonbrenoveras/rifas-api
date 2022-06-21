import { Model, DataTypes } from "sequelize";

class Quota extends Model {
  static init(sequelize) {
    super.init(
      {
        number: DataTypes.STRING,
        raffleId: DataTypes.INTEGER,
        orderId: DataTypes.INTEGER,
        reservationDate: DataTypes.DATE,
        paid: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: "quotas" }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Raffle, {
      foreignKey: "raffleId",
    });
  }
}

export default Quota;
