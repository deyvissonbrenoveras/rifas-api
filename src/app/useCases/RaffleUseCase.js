import RaffleStatusEnum from "../enums/RaffleStatusEnum";
import Raffle from "../models/Raffle";
import Image from "../models/Image";

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
  async findAllByUserId(userId) {
    const imageAttributes = ["url", "filename"];

    return await Raffle.findAll({
      where: { userId },
      attributes: [
        "id",
        "title",
        "description",
        "quotaQuantity",
        "quotaExpirationDate",
        "quotaPrice",
        "allowedQuotasPerPurchase",
        "status",
      ],
      include: [
        { model: Image, as: "firstImage", attributes: imageAttributes },
        { model: Image, as: "secondImage", attributes: imageAttributes },
        { model: Image, as: "thirdImage", attributes: imageAttributes },
      ],
    });
  }
}

export default new RaffleUseCase();
