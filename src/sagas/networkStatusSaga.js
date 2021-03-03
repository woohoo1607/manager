import { put, call, takeEvery, all, select } from "redux-saga/effects";

import { checkConnection } from "../api";

import {
  UPDATE_LAST_SUCCESS_CONNECTION,
  UPDATE_NETWORK_STATUS,
} from "../reducers/networkStatusReducer";
import { synchronizeEventSaga } from "./loggerSaga";
import { getData, setData } from "../helpers/localStorageHelper";

export const TRIGGER_GET_NETWORK_STATUS = "TRIGGER_GET_NETWORK_STATUS";

const getAwaitingDispatchEvents = ({
  logger: { awaitingDispatch } = { awaitingDispatch: [] },
}) => awaitingDispatch;

const getSynchronizationStatus = ({
  networkStatus: { isSynchronization } = { isSynchronization: false },
}) => isSynchronization;

const getLastSuccessConnection = ({
  networkStatus: { lastSuccessConnection } = { isSynchronization: null },
}) => lastSuccessConnection;

export function* checkNetworkSaga() {
  try {
    yield call(checkConnection);
    const awaitingDispatch = yield select(getAwaitingDispatchEvents);
    const isSynchronization = yield select(getSynchronizationStatus);
    yield call(setData, "lastSuccessConnection", new Date());
    yield put({ type: UPDATE_LAST_SUCCESS_CONNECTION, payload: new Date() });
    if (awaitingDispatch.length && !isSynchronization) {
      awaitingDispatch.sort((a, b) => a.date - b.date);
      for (let i = 0; i < awaitingDispatch.length; i++) {
        yield call(synchronizeEventSaga, { event: awaitingDispatch[i] });
      }
    }
    yield put({ type: UPDATE_NETWORK_STATUS, payload: true });
  } catch (err) {
    const lastSuccessConnection = yield select(getLastSuccessConnection);
    if (!lastSuccessConnection) {
      const lastSuccessConnection = yield call(
        getData,
        "lastSuccessConnection"
      );
      yield put({
        type: UPDATE_LAST_SUCCESS_CONNECTION,
        payload: lastSuccessConnection,
      });
    }
    yield put({ type: UPDATE_NETWORK_STATUS, payload: false });
  }
}

export function* watchCheckNetworkSaga() {
  yield takeEvery(TRIGGER_GET_NETWORK_STATUS, checkNetworkSaga);
}

export default function* networkStatusSaga() {
  yield all([watchCheckNetworkSaga()]);
}
