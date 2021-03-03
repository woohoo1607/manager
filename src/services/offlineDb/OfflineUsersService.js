import OfflineDBService from "./index";

class OfflineUsersService extends OfflineDBService {
  constructor() {
    super("users");
  }

  synchronization = async (data) => {
    try {
      await this.clearAll();
      await this.import(data);
    } catch (err) {
      throw new Error(err);
    }
  };

  validate = async (user) => {
    const { username = "", id = "", email = "" } = user;
    const errorFields = [];
    const users = (await this.getAll()) || [];

    users.forEach(
      ({
        id: foundId = "",
        username: foundUsername = "",
        email: foundEmail = "",
      }) => {
        if (foundId !== id) {
          if (foundEmail === email) {
            errorFields.push("email");
          } else if (foundUsername === username) {
            errorFields.push("username");
          }
        }
      }
    );
    return errorFields;
  };
}

export const offlineUsersService = new OfflineUsersService();
