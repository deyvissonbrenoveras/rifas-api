import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Order extends Model {}

Order.init(
  {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    raffleId: DataTypes.INTEGER,
  },
  { sequelize, tableName: "orders" }
);

export default Order;
