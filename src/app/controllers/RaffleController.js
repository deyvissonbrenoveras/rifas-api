import RaffleUseCase from "../useCases/RaffleUseCase";
import HttpStatus from "http-status-codes";

class RaffleController {
  async store(req, res) {
    const raffle = req.body;
    const createdRaffle = await RaffleUseCase.createRaffle(raffle);
    return res.status(HttpStatus.CREATED).json(createdRaffle);
  }
}

export default new RaffleController();
