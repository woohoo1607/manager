import DBService from "./index";

class UsersTempDataService extends DBService {
  constructor() {
    super("temp");
  }

  addData = async (user) => {
    let { id } = user;
    if (id) {
      await this.put(user);
    } else {
      id = await this.add(user);
    }
    return await this.getByID(id);
  };
}

export const usersTempDataService = new UsersTempDataService();
