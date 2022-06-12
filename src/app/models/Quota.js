import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Quota extends Model {}

Quota.init(
  {
    number: DataTypes.STRING,
    raffleId: DataTypes.INTEGER,
    buyerId: DataTypes.DATE,
    payDate: DataTypes.DATE,
  },
  { sequelize, tableName: "quotas" }
);

export default Quota;
