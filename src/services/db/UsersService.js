import DBService from "./index";

class UsersService extends DBService {
  constructor() {
    super("users");
  }
  checkUsername = async (username) =>
    await this.getFromIndex({ index: "username", query: username });

  checkEmail = async (email) =>
    await this.getFromIndex({ index: "email", query: email });

  addUser = async (user) => {
    const { username, email } = user;
    const foundedUser = await this.checkUsername(username);
    const foundedUserByEmail = await this.checkEmail(email);
    if (foundedUser) {
      throw new Error("username already exists");
    } else if (foundedUserByEmail) {
      throw new Error("email already exists");
    } else {
      return await this.add(user);
    }
  };

  updateUser = async (user) => {
    const { username, id, email } = user;
    const foundedUser = await this.checkUsername(username);
    const foundedUserByEmail = await this.checkEmail(email);
    if (foundedUser && foundedUser?.id !== id) {
      throw new Error("username already exists");
    } else if (foundedUserByEmail && foundedUserByEmail?.id !== id) {
      throw new Error("email already exists");
    } else {
      return await this.put(user);
    }
  };
}

export const usersService = new UsersService();
