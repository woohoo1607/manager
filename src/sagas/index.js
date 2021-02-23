import { all } from "redux-saga/effects";

import usersSaga from "./usersSagas";
import userFormSaga from "./userFormSaga";
import networkStatusSaga from "./networkStatusSaga";

export function* rootSaga() {
  yield all([usersSaga(), userFormSaga(), networkStatusSaga()]);
}
