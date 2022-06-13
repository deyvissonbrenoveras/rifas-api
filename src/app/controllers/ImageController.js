import ImageUseCase from "../useCases/ImageUseCase";

class ImageController {
  store(req, res) {
    req.files.forEach(async (file) => {
      const newPath = await ImageUseCase.compressFile(file);
      ImageUseCase.uploadToS3(newPath);
    });
    return res.send();
  }
}

export default new ImageController();
