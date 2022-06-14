import HttpStatus from "http-status-codes";
import ImageUseCase from "../useCases/ImageUseCase";
import RaffleUseCase from "../useCases/RaffleUseCase";

class ImageController {
  async store(req, res) {
    const { filename } = req.file;
    const image = await ImageUseCase.createImage(filename);
    return res.json(image);
  }
}

export default new ImageController();
