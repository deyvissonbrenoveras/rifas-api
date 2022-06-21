import { Model, DataTypes } from "sequelize";

class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${process.env.SERVER_ADDRESS}/images/${this.filename}`;
          },
        },
      },
      { sequelize, tableName: "images" }
    );
    return this;
  }
}

export default Image;
