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

    const reservationExpiration = new Date();

    reservationExpiration.setDate(
      reservationExpiration.getDate() + validRaffle.quotaExpirationInDays
    );

    const createdOrder = await OrderUseCase.createOrder({
      ...order,
      reservationExpiration,
    });

    await QuotaUseCase.updateQuotasOrderId(
      order.raffleId,
      order.quotas,
      createdOrder.id
    );

    return res.json(createdOrder);
  }
  async showByRaffleId(req, res) {
    const { id: raffleId } = req.params;
    const { userId } = req;
    if (!(await RaffleUseCase.raffleBelongsToUser(raffleId, userId))) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message:
          "The informed raffle doesn't exist or you don't have entitlements to view",
      });
    }
    const orders = await OrderUseCase.getOrdersByRaffleId(raffleId);
    return res.json(orders);
  }
  async markAsPaidById(req, res) {
    const { id: orderId } = req.params;
    const order = await OrderUseCase.getOrderById(orderId);

    return res.json(order);
  }
}

export default new OrderController();
