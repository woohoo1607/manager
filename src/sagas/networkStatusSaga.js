import { put, call, takeEvery, all } from "redux-saga/effects";

import { checkConnection } from "../api";

import { UPDATE_NETWORK_STATUS } from "../reducers/networkStatusReducer";

export const TRIGGER_GET_NETWORK_STATUS = "TRIGGER_GET_NETWORK_STATUS";

export function* checkNetworkSaga() {
  try {
    yield call(checkConnection);
    yield put({ type: UPDATE_NETWORK_STATUS, payload: true });
  } catch (err) {
    yield put({ type: UPDATE_NETWORK_STATUS, payload: false });
  }
}

export function* watchCheckNetworkSaga() {
  yield takeEvery(TRIGGER_GET_NETWORK_STATUS, checkNetworkSaga);
}

export default function* networkStatusSaga() {
  yield all([watchCheckNetworkSaga()]);
}
