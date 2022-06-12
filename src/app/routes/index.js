import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import asyncHandler from "express-async-handler";

const routes = Router();

routes.post("/user", asyncHandler(UserController.store));
routes.post("/auth", asyncHandler(AuthController.login));

export default routes;
