import sharp from "sharp";
import { resolve } from "path";
import Image from "../models/Image";
import fs from "fs";

class ImageUseCase {
  async compressFile(file) {
    const { originalname: name, filename, path: filePath } = file;

    const newPath = resolve("tmp", "uploads", filename);

    await sharp(filePath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(newPath);

    fs.unlinkSync(filePath);
    return newPath;
  }
  async createImage(filename) {
    return await Image.create({ filename });
  }
}

export default new ImageUseCase();
