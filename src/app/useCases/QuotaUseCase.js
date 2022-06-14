import { Op } from "sequelize";
import Quota from "../models/Quota";

class QuotaUseCase {
  async createQuota(quotaQuantity, raffleId, transaction) {
    const quotaList = [];

    for (let i = 0; i < quotaQuantity; i++) {
      quotaList.push({
        number: i,
        raffleId,
      });
    }

    return await Quota.bulkCreate(quotaList, { transaction });
  }
  async searchNotAvailableQuotas(raffleId, quotasArray) {
    return await Quota.findAll({
      where: {
        raffleId,
        number: quotasArray,
        buyerId: { [Op.not]: null },
      },
    });
  }
  async updateQuotasBuyerId(raffleId, quotasArray, buyerId, reservationDate) {
    await Quota.update(
      { buyerId, reservationDate },
      { where: { raffleId, number: quotasArray } }
    );
  }
}

export default new QuotaUseCase();
