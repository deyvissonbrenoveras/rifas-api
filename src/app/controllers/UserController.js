import User from "../models/User";
import UserUseCase from "../useCases/UserUseCase";
import HttpStatus from "http-status-codes";

class UserController {
  async store(req, res) {
    const user = req.body;
    if (await UserUseCase.checkIfUserExists(user)) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "User already exists" });
    }
    const createdUser = await UserUseCase.createUser(user);
    return res.status(HttpStatus.CREATED).json(createdUser);
  }
}

export default new UserController();
