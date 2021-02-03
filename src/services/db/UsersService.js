import DBService from "./index";

class UsersService extends DBService {
  constructor() {
    super("users");
  }
}

export const usersService = new UsersService();
