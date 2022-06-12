import User from "../models/User";
import UserSchema from "../validations/UserSchema";
class UserUseCase {
  async createUser(user) {
    await UserSchema.validateSync(user);
    const { id, name, email } = await User.create(user);
    return { id, name, email };
  }
}

export default new UserUseCase();
