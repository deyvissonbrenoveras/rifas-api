import Raffle from "../models/Raffle";

class RaffleUseCase {
  async createRaffle(raffle) {
    return await Raffle.create(raffle);
  }
}

export default new RaffleUseCase();
