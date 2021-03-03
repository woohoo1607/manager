import { put, call, takeEvery, all } from "redux-saga/effects";

import {
  showErrorNotification,
  showSuccessNotification,
} from "../actions/notificationActions";
import { loggerService } from "../services/offlineDb/LogerService";

import { UPDATE_LOGGER_EVENTS } from "../reducers/loggerReducer";
import { UPDATE_SYNCHRONIZATION_STATUS } from "../reducers/networkStatusReducer";
import { usersService } from "../services/db/UsersService";

export const TRIGGER_GET_LOGGER_EVENTS = "TRIGGER_GET_LOGGER_EVENTS";
export const TRIGGER_ADD_LOGGER_EVENT = "TRIGGER_ADD_LOGGER_EVENT";
export const TRIGGER_SYNCHRONIZE_EVENT = "TRIGGER_SYNCHRONIZE_EVENT";
export const TRIGGER_REMOVE_LOGGER_EVENTS = "TRIGGER_REMOVE_LOGGER_EVENTS";

export const LOGGER_ADD_USER = "add user";
export const LOGGER_UPDATE_USER = "update user";
export const LOGGER_DELETE_USER = "delete user";

const selectAction = ({ eventType = "", data = {} }) => {
  switch (eventType) {
    case LOGGER_ADD_USER: {
      return { action: usersService.addUser, params: data };
    }
    case LOGGER_UPDATE_USER: {
      return { action: usersService.updateUser, params: data };
    }
    case LOGGER_DELETE_USER: {
      return { action: usersService.delete, params: data.id };
    }
    default:
      throw new Error("unknown type");
  }
};

export function* getLoggerEventsSaga() {
  try {
    const events = yield call(loggerService.getAll);
    const awaitingDispatch = events.filter(
      ({ isAwaitingDispatch }) => isAwaitingDispatch === true
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

export function* synchronizeEventSaga({ event = {} }) {
  try {
    yield put({ type: UPDATE_SYNCHRONIZATION_STATUS, payload: true });
    const { action, params } = selectAction(event);
    yield call(action, params);
    const payload = {
      ...event,
      isSuccess: true,
      isAwaitingDispatch: false,
      lastTry: new Date(),
      error: "",
    };
    yield call(loggerService.put, payload);
    yield put({ type: TRIGGER_GET_LOGGER_EVENTS });
    yield put(showSuccessNotification({ message: "sync success" }));
  } catch ({ message }) {
    const payload = {
      ...event,
      error: message,
    };
    yield call(loggerService.put, payload);
    yield put(showErrorNotification({ message }));
  }
  yield put({ type: UPDATE_SYNCHRONIZATION_STATUS, payload: false });
}

export function* watchSynchronizeEventSaga() {
  yield takeEvery(TRIGGER_SYNCHRONIZE_EVENT, synchronizeEventSaga);
}

export function* removeLoggerEventsSaga() {
  try {
    yield call(loggerService.clearAll);
    yield put({ type: TRIGGER_GET_LOGGER_EVENTS });
    yield put(
      showSuccessNotification({ message: "Logs removed successfully" })
    );
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchRemoveLoggerEventsSaga() {
  yield takeEvery(TRIGGER_REMOVE_LOGGER_EVENTS, removeLoggerEventsSaga);
}

export default function* loggerEventsSaga() {
  yield all([
    watchGetLoggerEventsSaga(),
    watchAddLoggerEventSaga(),
    watchSynchronizeEventSaga(),
    watchRemoveLoggerEventsSaga(),
  ]);
}
