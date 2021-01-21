import { combineReducers } from "redux";
import userReducer from "../containers/UserFormContainer/reducer";

export default combineReducers({
  user: userReducer,
});
