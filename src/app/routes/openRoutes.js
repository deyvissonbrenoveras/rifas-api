import express, { Router } from "express";
import asyncHandler from "express-async-handler";

// Enable __dirname using ECMAScript module scope
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import OrderController from "../controllers/OrderController";
import RaffleController from "../controllers/RaffleController";

const openRoutes = Router();

openRoutes.use(
  "/images",
  express.static(path.join(__dirname, "..", "..", "..", "tmp"))
);
openRoutes.get("/raffles/:id", asyncHandler(RaffleController.index));
openRoutes.post("/orders", asyncHandler(OrderController.store));
openRoutes.post("/users", asyncHandler(UserController.store));
openRoutes.post("/auth", asyncHandler(AuthController.login));

export default openRoutes;
