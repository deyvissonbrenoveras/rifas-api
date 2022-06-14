import Buyer from "../models/Buyer";
import BuyerSchema from "../validations/BuyerSchema";

class BuyerUseCase {
  async createBuyer(buyer) {
    await BuyerSchema.validateSync(buyer);
    return await Buyer.create(buyer);
  }
}

export default new BuyerUseCase();
