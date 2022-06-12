import { Router } from "express";
import auth from "../middlewares/auth";

const authenticatedRoutes = Router();

authenticatedRoutes.use(auth);

authenticatedRoutes.post("/test", (req, res) => {
  console.log(req.userId);
  res.send("ok");
});

export default authenticatedRoutes;
