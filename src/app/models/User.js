import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      { sequelize, tableName: "users" }
    );
    this.addHook("beforeSave", (user) => {
      user.password = bcrypt.hashSync(user.password, 10);
    });
    return this;
  }
}

export default User;
