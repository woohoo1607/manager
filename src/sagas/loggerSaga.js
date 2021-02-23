import { put, call, takeEvery, all } from "redux-saga/effects";

import { showErrorNotification } from "../actions/notificationActions";
import { loggerService } from "../services/db/LogerService";

import { UPDATE_LOGGER_EVENTS } from "../reducers/loggerReducer";

export const TRIGGER_GET_LOGGER_EVENTS = "TRIGGER_GET_LOGGER_EVENTS";
export const TRIGGER_ADD_LOGGER_EVENT = "TRIGGER_ADD_LOGGER_EVENT";

export function* getLoggerEventsSaga() {
  try {
    const events = yield call(loggerService.getAll);
    const unsuccessfulEvents = events.filter(
      ({ isSuccess }) => isSuccess === false
    );
    yield put({
      type: UPDATE_LOGGER_EVENTS,
      payload: { events, unsuccessfulEvents },
    });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchGetLoggerEventsSaga() {
  yield takeEvery(TRIGGER_GET_LOGGER_EVENTS, getLoggerEventsSaga);
}

export default function* loggerEventsSaga() {
  yield all([watchGetLoggerEventsSaga()]);
}
