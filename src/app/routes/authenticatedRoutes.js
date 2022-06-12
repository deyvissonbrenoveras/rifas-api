import { Router } from "express";
import auth from "../middlewares/auth";
import RaffleController from "../controllers/RaffleController";
const authenticatedRoutes = Router();

authenticatedRoutes.use(auth);

authenticatedRoutes.post("/raffles", RaffleController.store);

export default authenticatedRoutes;
