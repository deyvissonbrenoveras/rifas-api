import bcrypt from "bcrypt";

class AuthUseCase {
  async passwordIsValid(userPassword, hashPassword) {
    return bcrypt.compareSync(userPassword, hashPassword);
  }
}

export default new AuthUseCase();
