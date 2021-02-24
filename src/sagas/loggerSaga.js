import { put, call, takeEvery, all } from "redux-saga/effects";

import { showErrorNotification } from "../actions/notificationActions";
import { loggerService } from "../services/offlineDb/LogerService";

import { UPDATE_LOGGER_EVENTS } from "../reducers/loggerReducer";

export const TRIGGER_GET_LOGGER_EVENTS = "TRIGGER_GET_LOGGER_EVENTS";
export const TRIGGER_ADD_LOGGER_EVENT = "TRIGGER_ADD_LOGGER_EVENT";

export function* getLoggerEventsSaga() {
  try {
    const events = yield call(loggerService.getAll);
    const awaitingDispatch = events.filter(
      ({ isAwaitingDispatch }) => isAwaitingDispatch === false
    );
    yield put({
      type: UPDATE_LOGGER_EVENTS,
      payload: { events, awaitingDispatch },
    });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchGetLoggerEventsSaga() {
  yield takeEvery(TRIGGER_GET_LOGGER_EVENTS, getLoggerEventsSaga);
}

export function* addLoggerEventSaga({ type, ...payload }) {
  try {
    yield call(loggerService.add, payload);
    yield put({ type: TRIGGER_GET_LOGGER_EVENTS });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchAddLoggerEventSaga() {
  yield takeEvery(TRIGGER_ADD_LOGGER_EVENT, addLoggerEventSaga);
}

export default function* loggerEventsSaga() {
  yield all([watchGetLoggerEventsSaga(), watchAddLoggerEventSaga()]);
}
