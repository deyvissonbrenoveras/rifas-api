import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, tableName: "users" }
);

User.addHook("beforeSave", (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

export default User;
