import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Raffles extends Model {}

Raffles.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    quotaExpirationDate: DataTypes.DATE,
    quotaPrice: DataTypes.DOUBLE,
    status: DataTypes.STRING,
  },
  { sequelize, tableName: "raffles" }
);

export default Raffles;
