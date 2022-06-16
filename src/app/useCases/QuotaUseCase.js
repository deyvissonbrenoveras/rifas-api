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

  async countAvailableQuotas(raffleId, quotasArray) {
    return await Quota.count({
      where: {
        raffleId,
        number: quotasArray,
        orderId: { [Op.is]: null },
      },
    });
  }
  async updateQuotasOrderId(raffleId, quotasArray, orderId, reservationDate) {
    await Quota.update(
      { orderId, reservationDate },
      { where: { raffleId, number: quotasArray } }
    );
  }
}

export default new QuotaUseCase();
