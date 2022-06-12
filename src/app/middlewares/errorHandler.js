import { ValidationError } from "yup";

export default (err, req, res, next) => {
  if (err) {
    console.log(err);

    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.errors });
    }

    return res.status(500).json({ error: "error occurred" });
  }
  next();
};
