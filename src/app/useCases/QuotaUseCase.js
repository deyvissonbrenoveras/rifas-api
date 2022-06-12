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
}

export default new QuotaUseCase();
