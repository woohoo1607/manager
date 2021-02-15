import DBService from "./index";

class UserFormService extends DBService {
  constructor() {
    super("temp");
  }

  addData = async (user) => {
    let { id } = user;
    if (id) {
      return await this.put(user);
    } else {
      return await this.add(user);
    }
  };
}

export const userFormService = new UserFormService();
