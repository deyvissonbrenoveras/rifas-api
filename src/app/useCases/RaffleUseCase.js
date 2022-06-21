import RaffleStatusEnum from "../enums/RaffleStatusEnum";
import Raffle from "../models/Raffle";
import Image from "../models/Image";

class RaffleUseCase {
  raffleAttributes = [
    "id",
    "title",
    "description",
    "quotaQuantity",
    "quotaExpirationDate",
    "quotaPrice",
    "allowedQuotasPerPurchase",
    "status",
  ];

  imageAttributes = ["url", "filename"];

  raffleIncludes = [
    { model: Image, as: "firstImage", attributes: this.imageAttributes },
    { model: Image, as: "secondImage", attributes: this.imageAttributes },
    { model: Image, as: "thirdImage", attributes: this.imageAttributes },
  ];

  async raffleBelongsToUser(raffleId, userId) {
    const raffle = await Raffle.findByPk(raffleId);
    return raffle && raffle.userId == userId;
  }
  async findInProgressRaffleById(raffleId) {
    return await Raffle.findOne({
      where: { id: raffleId, status: RaffleStatusEnum.IN_PROGRESS },
    });
  }
  async findByPk(raffleId) {
    return await Raffle.findByPk(raffleId, {
      attributes: this.raffleAttributes,
      include: this.raffleIncludes,
    });
  }
  async createRaffle(raffle, userId, transaction) {
    raffle.userId = userId;
    raffle.status = RaffleStatusEnum.WAITING_FOR_PAYMENT;
    return await Raffle.create(raffle, { transaction });
  }
  async findAllByUserId(userId) {
    return await Raffle.findAll({
      where: { userId },
      attributes: this.raffleAttributes,
      include: this.raffleIncludes,
    });
  }
}

export default new RaffleUseCase();
