import RaffleStatusEnum from "../enums/RaffleStatusEnum";
import Raffle from "../models/Raffle";
import Image from "../models/Image";
import Quota from "../models/Quota";
import Order from "../models/Order";

class RaffleUseCase {
  raffleAttributes = [
    "id",
    "title",
    "description",
    "quotaQuantity",
    "quotaExpirationInDays",
    "quotaPrice",
    "allowedQuotasPerPurchase",
    "status",
    "firstImageId",
    "secondImageId",
    "thirdImageId",
    "categoryId",
  ];

  imageAttributes = ["url", "filename", "id"];

  raffleIncludes = [
    { model: Image, as: "firstImage", attributes: this.imageAttributes },
    { model: Image, as: "secondImage", attributes: this.imageAttributes },
    { model: Image, as: "thirdImage", attributes: this.imageAttributes },
    {
      model: Quota,
      as: "quotas",
      attributes: ["id", "number", "available"],
      include: { model: Order, as: "order", attributes: ["id", "paid"] },
    },
  ];

  async raffleBelongsToUser(raffleId, userId) {
    const raffle = await Raffle.findByPk(raffleId);
    return raffle && raffle.userId == userId;
  }
  async findInProgressRaffleById(raffleId) {
    // TODO Validation disabled for development
    //
    // return await Raffle.findOne({
    //   where: { id: raffleId, status: RaffleStatusEnum.IN_PROGRESS },
    // });

    return await Raffle.findOne({
      where: { id: raffleId },
    });
  }
  async findByPk(raffleId) {
    return await Raffle.findByPk(raffleId, {
      attributes: this.raffleAttributes,
      include: this.raffleIncludes,
      order: [["quotas", "number", "ASC"]],
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
