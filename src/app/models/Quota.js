import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Quota extends Model {}

Quota.init(
  {
    number: DataTypes.STRING,
    raffleId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    reservationDate: DataTypes.DATE,
    paid: DataTypes.BOOLEAN,
  },
  { sequelize, tableName: "quotas" }
);

export default Quota;
