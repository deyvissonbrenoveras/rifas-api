import { Router } from "express";
import asyncHandler from "express-async-handler";

import multer from "multer";
import auth from "../middlewares/auth";

import ImageController from "../controllers/ImageController";
import RaffleController from "../controllers/RaffleController";
import PrizeController from "../controllers/PrizeController";

import multerStorage from "../config/multerStorage";
import OrderController from "../controllers/OrderController";
const maxImages = 3;
const upload = multer({
  storage: multerStorage,
});

const authenticatedRoutes = Router();

// AUTHENTICATION
authenticatedRoutes.use(auth);

// IMAGES
authenticatedRoutes.post(
  "/images",
  upload.single("image", maxImages),
  asyncHandler(ImageController.store)
);

// RAFFLEs
authenticatedRoutes.get("/raffles", asyncHandler(RaffleController.show));
authenticatedRoutes.post("/raffles", asyncHandler(RaffleController.store));
authenticatedRoutes.put("/raffles/:id", asyncHandler(RaffleController.update));

// PRIZES
authenticatedRoutes.post("/prizes", asyncHandler(PrizeController.store));

// ORDERS
authenticatedRoutes.get(
  "/raffles/:id/orders",
  asyncHandler(OrderController.showByRaffleId)
);
authenticatedRoutes.get(
  "/orders/:id/mark-as-paid",
  asyncHandler(OrderController.markAsPaidById)
);

export default authenticatedRoutes;
