import { combineReducers } from "redux";
import userReducer from "../pages/NewUserPage/reducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
});
