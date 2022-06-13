import sharp from "sharp";
import { resolve } from "path";
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
  async uploadToS3(filePath) {
    console.log(filePath);
  }
}

export default new ImageUseCase();
