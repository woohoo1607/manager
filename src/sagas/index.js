import { all } from "redux-saga/effects";
import usersSaga from "./usersSagas";
import userFormSaga from "./userFormSaga";

export function* rootSaga() {
  yield all([usersSaga(), userFormSaga()]);
}
