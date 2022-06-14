import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Buyer extends Model {}

Buyer.init(
  {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    raffleId: DataTypes.INTEGER,
  },
  { sequelize, tableName: "buyers" }
);

export default Buyer;
