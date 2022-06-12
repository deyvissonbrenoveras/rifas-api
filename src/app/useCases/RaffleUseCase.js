import RaffleStatusEnum from "../enums/RaffleStatusEnum";
import Raffle from "../models/Raffle";

class RaffleUseCase {
  async createRaffle(raffle, userId, transaction) {
    raffle.userId = userId;
    raffle.status = RaffleStatusEnum.WAITING_FOR_PAYMENT;
    return await Raffle.create(raffle, { transaction });
  }
}

export default new RaffleUseCase();
