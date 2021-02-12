import DBService from "./index";

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

  getSomeUsers = async (page = 1, count = 10) => {
    const allUsers = await this.getAll();
    const start = page * count - count;
    return {
      users: allUsers.slice(start, start + count),
      pages: Math.round(allUsers.length / count) || 1,
    };
  };
}

export const usersService = new UsersService();
