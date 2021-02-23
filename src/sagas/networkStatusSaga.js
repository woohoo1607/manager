import { put, call, takeEvery, all } from "redux-saga/effects";

import { showErrorNotification } from "../actions/notificationActions";

import { UPDATE_NETWORK_STATUS } from "../reducers/networkStatusReducer";

export const TRIGGER_GET_NETWORK_STATUS = "TRIGGER_GET_NETWORK_STATUS";

const fetchGoogle = () =>
  fetch("https://www.google.com", {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => true)
    .catch(() => false);

export function* checkNetworkSaga() {
  try {
    const isOnline = yield call(fetchGoogle);
    yield put({ type: UPDATE_NETWORK_STATUS, payload: isOnline });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchCheckNetworkSaga() {
  yield takeEvery(TRIGGER_GET_NETWORK_STATUS, checkNetworkSaga);
}

export default function* networkStatusSaga() {
  yield all([watchCheckNetworkSaga()]);
}
