import User from "../models/User";
import UserUseCase from "../useCases/UserUseCase";

class UserController {
  async store(req, res) {
    const user = req.body;
    const createdUser = await UserUseCase.createUser(user);
    res.json(createdUser);
  }
}

export default new UserController();
