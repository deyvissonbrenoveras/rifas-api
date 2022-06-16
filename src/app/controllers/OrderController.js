import OrderUseCase from "../useCases/OrderUseCase";
import RaffleUseCase from "../useCases/RaffleUseCase";
import HttpStatus from "http-status-codes";
import QuotaUseCase from "../useCases/QuotaUseCase";
import OrderSchema from "../validations/OrderSchema";

class OrderController {
  async store(req, res) {
    const order = req.body;

    await OrderSchema.validateSync(order);

    const validRaffle = await RaffleUseCase.findInProgressRaffleById(
      order.raffleId
    );

    if (!validRaffle) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "The informed raffle is not active or doesn't exist",
      });
    }

    if (
      validRaffle.allowedQuotasPerPurchase &&
      validRaffle.allowedQuotasPerPurchase < order.quotas.length
    ) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message:
          "Order exceeded the quota limit per purchase in this raffle: " +
          validRaffle.allowedQuotasPerPurchase,
      });
    }

    const quotasAvailableCount = await QuotaUseCase.countAvailableQuotas(
      order.raffleId,
      order.quotas
    );

    if (quotasAvailableCount != order.quotas.length) {
      return res.status(HttpStatus.CONFLICT).json({
        message: "Some of informed quotas is not available",
      });
    }

    const createdOrder = await OrderUseCase.createOrder(order);

    await QuotaUseCase.updateQuotasOrderId(
      order.raffleId,
      order.quotas,
      createdOrder.id,
      Date.now()
    );

    return res.json(createdOrder);
  }
}

export default new OrderController();
