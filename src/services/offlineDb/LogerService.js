import OfflineDBService from "./index";

class LoggerService extends OfflineDBService {
  constructor() {
    super("logger");
  }
}

export const loggerService = new LoggerService();
