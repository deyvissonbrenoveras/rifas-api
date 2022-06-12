import express from "express";
import dotenv from "dotenv";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

class App {
  server;

  constructor() {
    this.config();
    this.routes();
  }

  config() {
    dotenv.config();
    this.server = express();
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(errorHandler);
  }
}

export default new App().server;
