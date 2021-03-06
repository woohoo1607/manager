import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import notificationReducer from "./notificationReducer";
import userFormReducer from "./userFormReducer";
import networkStatusReducer from "./networkStatusReducer";
import loggerReducer from "./loggerReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
  users: usersReducer,
  notification: notificationReducer,
  userForm: userFormReducer,
  networkStatus: networkStatusReducer,
  logger: loggerReducer,
  theme: themeReducer,
});
