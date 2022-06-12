import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import asyncHandler from "express-async-handler";

const openRoutes = Router();

openRoutes.post("/user", asyncHandler(UserController.store));
openRoutes.post("/auth", asyncHandler(AuthController.login));

export default openRoutes;
