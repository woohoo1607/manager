import { put, call, takeEvery, all, select } from "redux-saga/effects";

import { checkConnection } from "../api";

import {
  UPDATE_NETWORK_STATUS,
  UPDATE_SYNCHRONIZATION_STATUS,
} from "../reducers/networkStatusReducer";
import { TRIGGER_SYNCHRONIZE_EVENTS } from "./loggerSaga";

export const TRIGGER_GET_NETWORK_STATUS = "TRIGGER_GET_NETWORK_STATUS";

const getAwaitingDispatchEvents = ({
  logger: { awaitingDispatch } = { awaitingDispatch: [] },
}) => awaitingDispatch;

const getSynchronizationStatus = ({
  networkStatus: { isSynchronization } = { isSynchronization: false },
}) => isSynchronization;

export function* checkNetworkSaga() {
  try {
    yield call(checkConnection);
    const awaitingDispatch = yield select(getAwaitingDispatchEvents);
    const isSynchronization = yield select(getSynchronizationStatus);
    if (awaitingDispatch.length && !isSynchronization) {
      yield put({ type: UPDATE_SYNCHRONIZATION_STATUS, payload: true });
      yield put({ type: TRIGGER_SYNCHRONIZE_EVENTS, events: awaitingDispatch });
    }
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
