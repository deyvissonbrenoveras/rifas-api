import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "users" }
);

User.addHook("beforeSave", (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

export default User;
