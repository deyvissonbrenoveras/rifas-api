class UserController {
  store(req, res) {
    res.json(req.body);
  }
}

export default new UserController();
