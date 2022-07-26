import { Model, DataTypes } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        raffleId: DataTypes.INTEGER,
        paid: DataTypes.BOOLEAN,
        reservationExpiration: DataTypes.DATE,
      },
      { sequelize, tableName: "orders" }
    );
    return this;
  }
}

export default Order;
