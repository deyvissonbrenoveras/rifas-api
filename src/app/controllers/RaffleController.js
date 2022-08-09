import sequelize from "../../database";
import RaffleUseCase from "../useCases/RaffleUseCase";
import HttpStatus from "http-status-codes";
import QuotaUseCase from "../useCases/QuotaUseCase";
import RaffleSchema from "../validations/RaffleSchema";

class RaffleController {
  async index(req, res) {
    const { id } = req.params;

    const foundRaffle = await RaffleUseCase.findByPk(id);
    if (!foundRaffle) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: `Raffle with id ${id} not found` });
    }
    return res.json(foundRaffle);
  }

  async show(req, res) {
    const { userId } = req;
    return res.json(await RaffleUseCase.findAllByUserId(userId));
  }

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

  async update(req, res) {
    const raffle = req.body;
    const { id } = req.params;
    const { userId } = req;

    const validRaffle = await RaffleUseCase.findInProgressRaffleById(id);
    if (!validRaffle) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "The informed raffle is not active or doesn't exist",
      });
    } else if (validRaffle.userId !== userId) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: "You don't have entitlements to update this raffle",
      });
    }

    const updatedRaffle = await RaffleUseCase.updateRaffle(id, raffle);

    return res.json(updatedRaffle);
  }
}

export default new RaffleController();
