import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import popupReducer from "./popupReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  popup: popupReducer,
});
