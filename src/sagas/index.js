import { all } from "redux-saga/effects";
import usersSaga from "./usersSagas";

export function* rootSaga() {
  yield all([usersSaga()]);
}
