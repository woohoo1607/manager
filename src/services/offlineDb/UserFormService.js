import OfflineDBService from "./index";

class UserFormService extends OfflineDBService {
  constructor() {
    super("temp");
  }

  addData = async (user) => {
    let { id } = user;
    return id ? await this.put(user) : await this.add(user);
  };
}

export const userFormService = new UserFormService();
