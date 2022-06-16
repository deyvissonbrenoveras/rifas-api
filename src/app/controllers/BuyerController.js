import BuyerUseCase from "../useCases/BuyerUseCase";
import RaffleUseCase from "../useCases/RaffleUseCase";
import HttpStatus from "http-status-codes";
import QuotaUseCase from "../useCases/QuotaUseCase";
import BuyerSchema from "../validations/BuyerSchema";

class BuyerController {
  async store(req, res) {
    const buyer = req.body;

    await BuyerSchema.validateSync(buyer);

    const validRaffle = await RaffleUseCase.findInProgressRaffleById(
      buyer.raffleId
    );

    if (!validRaffle) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "The informed raffle is not active or doesn't exist",
      });
    }

    if (
      validRaffle.allowedQuotasPerPurchase &&
      validRaffle.allowedQuotasPerPurchase < buyer.quotas.length
    ) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message:
          "Buyer exceeded the quota limit per purchase in this raffle: " +
          validRaffle.allowedQuotasPerPurchase,
      });
    }

    const quotasAvailableCount = await QuotaUseCase.countAvailableQuotas(
      buyer.raffleId,
      buyer.quotas
    );

    if (quotasAvailableCount != buyer.quotas.length) {
      return res.status(HttpStatus.CONFLICT).json({
        message: "Some of informed quotas is not available",
      });
    }

    const createdBuyer = await BuyerUseCase.createBuyer(buyer);

    await QuotaUseCase.updateQuotasBuyerId(
      buyer.raffleId,
      buyer.quotas,
      createdBuyer.id,
      Date.now()
    );

    return res.json(createdBuyer);
  }
}

export default new BuyerController();
