import { Sequelize } from "sequelize";
import config from "./config/config";

import Image from "../app/models/Image";
import Raffle from "../app/models/Raffle";
import Order from "../app/models/Order";
import Quota from "../app/models/Quota";
import User from "../app/models/User";

const models = [Image, Order, Quota, Raffle, User];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(config);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database().connection;
