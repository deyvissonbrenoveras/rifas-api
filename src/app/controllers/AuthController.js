import User from "../models/User";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    res.json(user);
  }
}

export default new AuthController();
