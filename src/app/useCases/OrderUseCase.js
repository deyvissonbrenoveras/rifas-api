import Order from "../models/Order";
import OrderSchema from "../validations/OrderSchema";

class OrderUseCase {
  async createOrder(order) {
    await OrderSchema.validateSync(order);
    return await Order.create(order);
  }
}

export default new OrderUseCase();
