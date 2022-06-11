import express from "express";
import dotenv from "dotenv";

const app = express();

class App {
  server;

  constructor() {
    this.config();
    this.routes();
  }

  config() {
    this.server = express();
    dotenv.config();
  }

  routes() {}
}

export default new App().server;
