import DBService from "./index";
import { generateAccount } from "../../helpers/generateAccount";

class UsersService extends DBService {
  constructor() {
    super("users");
  }
  checkUsername = async (username) =>
    await this.getFromIndex({ index: "username", query: username });

  addUser = async (user) => {
    const { username } = user;
    const foundedUser = await this.checkUsername(username);
    if (foundedUser) {
      throw new Error("username already exists");
    } else {
      return await this.add(user);
    }
  };

  updateUser = async (user) => {
    const { username, id } = user;
    const foundedUser = await this.checkUsername(username);
    if (foundedUser && foundedUser.id !== id) {
      throw new Error("username already exists");
    } else {
      return await this.put(user);
    }
  };

  generateUsers = async (count) => {
    await this.clearAll();
    for (let i = 0; i < count; i++) {
      await this.add(generateAccount());
    }
  };
}

export const usersService = new UsersService();
