import DBService from "./index";

class LoggerService extends DBService {
  constructor() {
    super("logger");
  }
}

export const loggerService = new LoggerService();
