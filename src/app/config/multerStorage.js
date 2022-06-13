import multer from "multer";
import crypto from "crypto";

export default multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    const fileExt = file.originalname.split(".")[1];

    const newFileName = crypto.randomBytes(64).toString("hex");

    cb(null, `${newFileName}.${fileExt}`);
  },
});
