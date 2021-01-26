import { combineReducers } from "redux";
import userReducer from "../pages/NewUserPage/reducer";

export default combineReducers({
  user: userReducer,
});
