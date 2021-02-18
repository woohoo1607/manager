import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import notificationReducer from "./notificationReducer";
import userFormReducer from "./userFormReducer";

export default combineReducers({
  users: usersReducer,
  notification: notificationReducer,
  userForm: userFormReducer,
});
