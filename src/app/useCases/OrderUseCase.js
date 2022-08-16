import Order from "../models/Order";
import OrderSchema from "../validations/OrderSchema";

class OrderUseCase {
  async getOrderById(id) {
    return await Order.findByPk(id);
  }
  async createOrder(order) {
    await OrderSchema.validateSync(order);
    return await Order.create(order);
  }
  async getOrdersByRaffleId(raffleId) {
    return await Order.findAll({ where: { raffleId } });
  }
}

export default new OrderUseCase();
