import sequelize from "../../database";
import RaffleUseCase from "../useCases/RaffleUseCase";
import HttpStatus from "http-status-codes";
import QuotaUseCase from "../useCases/QuotaUseCase";
import RaffleSchema from "../validations/RaffleSchema";

class RaffleController {
  async store(req, res) {
    const raffle = req.body;
    const { userId } = req;
    await RaffleSchema.validateSync(raffle);

    try {
      await sequelize.transaction(async (transaction) => {
        const createdRaffle = await RaffleUseCase.createRaffle(
          raffle,
          userId,
          transaction
        );

        await QuotaUseCase.createQuota(
          raffle.quotaQuantity,
          createdRaffle.id,
          transaction
        );
        return res.status(HttpStatus.CREATED).json(createdRaffle);
      });
    } catch (err) {
      const message = "An error has occurred while creating raffle";
      console.log(message + " transaction rolled back", err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}

export default new RaffleController();
