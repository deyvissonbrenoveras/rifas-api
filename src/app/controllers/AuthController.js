import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes";
import UserUseCase from "../useCases/UserUseCase";
import AuthUseCase from "../useCases/AuthUseCase";

class AuthController {
  async login(req, res) {
    const userRequest = req.body;
    const userFound = await UserUseCase.checkIfUserExists(userRequest);

    if (!userFound) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    if (
      !(await AuthUseCase.passwordIsValid(
        userRequest.password,
        userFound.password
      ))
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET);

    return res.json({
      id: userFound.id,
      email: userFound.email,
      name: userFound.name,
      token,
    });
  }
}

export default new AuthController();
