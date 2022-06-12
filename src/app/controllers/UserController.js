import User from "../models/User";

class UserController {
  async store(req, res) {
    await User.create(req.body);
    res.json(req.body);
  }
}

export default new UserController();
