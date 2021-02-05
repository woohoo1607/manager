import { all } from "redux-saga/effects";
import usersSaga from "./usersSagas";
import userSaga from "./userSaga";

export function* rootSaga() {
  yield all([usersSaga(), userSaga()]);
}
