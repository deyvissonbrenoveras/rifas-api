import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes";

export default async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    req.userId = decoded.userId;
  });
  next();
};
