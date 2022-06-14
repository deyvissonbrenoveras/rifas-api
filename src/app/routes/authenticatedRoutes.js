import { Router } from "express";

import multer from "multer";
import auth from "../middlewares/auth";

import RaffleController from "../controllers/RaffleController";
import ImageController from "../controllers/ImageController";

import multerStorage from "../config/multerStorage";
const maxImages = 3;
const upload = multer({
  storage: multerStorage,
});

const authenticatedRoutes = Router();

authenticatedRoutes.use(auth);

authenticatedRoutes.post("/raffles", RaffleController.store);
authenticatedRoutes.post(
  "/images",
  upload.single("image", maxImages),
  ImageController.store
);

export default authenticatedRoutes;
