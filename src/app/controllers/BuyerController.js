import BuyerUseCase from "../useCases/BuyerUseCase";
import RaffleUseCase from "../useCases/RaffleUseCase";
import HttpStatus from "http-status-codes";

class BuyerController {
  async store(req, res) {
    const buyer = req.body;

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

    const createdBuyer = await BuyerUseCase.createBuyer(buyer);
    return res.json(createdBuyer);
  }
}

export default new BuyerController();
