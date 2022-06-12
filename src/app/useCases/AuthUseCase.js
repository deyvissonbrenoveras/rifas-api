import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthUseCase {
  async passwordIsValid(userPassword, hashPassword) {
    return bcrypt.compareSync(userPassword, hashPassword);
  }
  async signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}

export default new AuthUseCase();
