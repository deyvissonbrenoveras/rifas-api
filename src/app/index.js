import express from "express";
import dotenv from "dotenv";

import { openRoutes, authenticatedRoutes } from "./routes";
import errorHandler from "./middlewares/errorHandler";

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
    this.server.use(openRoutes);
    this.server.use(authenticatedRoutes);
    this.server.use(errorHandler);
  }
}

export default new App().server;
