import { combineReducers } from "redux";
import userReducer from "../containers/StepWizardContainer/reducer";

export default combineReducers({
  user: userReducer,
});
