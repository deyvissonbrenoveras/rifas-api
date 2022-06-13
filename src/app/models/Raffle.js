import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Raffle extends Model {}

Raffle.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    quotaQuantity: DataTypes.INTEGER,
    quotaExpirationDate: DataTypes.DATE,
    quotaPrice: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  { sequelize, tableName: "raffles" }
);

export default Raffle;
