import RaffleStatusEnum from "../enums/RaffleStatusEnum";
import Raffle from "../models/Raffle";

class RaffleUseCase {
  async raffleBelongsToUser(raffleId, userId) {
    const raffle = await Raffle.findByPk(raffleId);
    return raffle && raffle.userId == userId;
  }
  async findInProgressRaffleById(raffleId) {
    return await Raffle.findOne({
      where: { id: raffleId, status: RaffleStatusEnum.IN_PROGRESS },
    });
  }
  async createRaffle(raffle, userId, transaction) {
    raffle.userId = userId;
    raffle.status = RaffleStatusEnum.WAITING_FOR_PAYMENT;
    return await Raffle.create(raffle, { transaction });
  }
}

export default new RaffleUseCase();
