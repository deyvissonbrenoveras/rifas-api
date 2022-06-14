import { Model, DataTypes } from "sequelize";
import sequelize from "../../database";

class Image extends Model {}

Image.init(
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

export default Image;
