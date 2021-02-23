import { all } from "redux-saga/effects";

import usersSaga from "./usersSagas";
import userFormSaga from "./userFormSaga";
import networkStatusSaga from "./networkStatusSaga";
import loggerEventsSaga from "./loggerSaga";

export function* rootSaga() {
  yield all([
    usersSaga(),
    userFormSaga(),
    networkStatusSaga(),
    loggerEventsSaga(),
  ]);
}
