import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
});
