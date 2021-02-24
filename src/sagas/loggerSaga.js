import { put, call, takeEvery, all } from "redux-saga/effects";

import { showErrorNotification } from "../actions/notificationActions";
import { loggerService } from "../services/offlineDb/LogerService";

import { UPDATE_LOGGER_EVENTS } from "../reducers/loggerReducer";
import { UPDATE_SYNCHRONIZATION_STATUS } from "../reducers/networkStatusReducer";
import { TRIGGER_UPDATE_USER } from "./usersSagas";
import { usersService } from "../services/db/UsersService";

export const TRIGGER_GET_LOGGER_EVENTS = "TRIGGER_GET_LOGGER_EVENTS";
export const TRIGGER_ADD_LOGGER_EVENT = "TRIGGER_ADD_LOGGER_EVENT";
export const TRIGGER_SYNCHRONIZE_EVENTS = "TRIGGER_SYNCHRONIZE_EVENTS";

export const LOGGER_ADD_USER = "add user";
export const LOGGER_UPDATE_USER = "update user";
export const LOGGER_DELETE_USER = "delete user";

const syncActions = {
  addUser: () => console.log("ADD"),
  updateUser: () => console.log("UPDATE"),
  deleteUser: () => console.log("DELETE"),
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

export function* synchronizeEventsSaga({ events = [] }) {
  try {
    for (let i = 0; i < events.length; i++) {
      switch (events[i].eventType) {
        case LOGGER_ADD_USER: {
          try {
            yield call(usersService.addUser, events[i].data);
            const payload = {
              ...events[i],
              isSuccess: true,
              isAwaitingDispatch: false,
              lastTry: new Date(),
              error: "",
            };
            yield call(loggerService.put, payload);
          } catch (error) {
            const payload = {
              ...events,
              lastTry: new Date(),
            };
            yield call(loggerService.put, payload);
          }
          break;
        }
        case LOGGER_UPDATE_USER: {
          try {
            yield call(usersService.updateUser, events[i].data);
            const payload = {
              ...events[i],
              isSuccess: true,
              isAwaitingDispatch: false,
              lastTry: new Date(),
              error: "",
            };
            yield call(loggerService.put, payload);
          } catch (error) {
            const payload = {
              ...events,
              lastTry: new Date(),
            };
            yield call(loggerService.put, payload);
          }
          break;
        }
        case LOGGER_DELETE_USER: {
          try {
            yield call(usersService.delete, events[i].data);
            const payload = {
              ...events[i],
              isSuccess: true,
              isAwaitingDispatch: false,
              lastTry: new Date(),
              error: "",
            };
            yield call(loggerService.put, payload);
          } catch (error) {
            const payload = {
              ...events,
              lastTry: new Date(),
            };
            yield call(loggerService.put, payload);
          }
          break;
        }
      }
    }
    // yield call(loggerService.add, payload);
    yield put({ type: UPDATE_SYNCHRONIZATION_STATUS, payload: false });
    yield put({ type: TRIGGER_GET_LOGGER_EVENTS });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchSynchronizeEventsSaga() {
  yield takeEvery(TRIGGER_SYNCHRONIZE_EVENTS, synchronizeEventsSaga);
}

export default function* loggerEventsSaga() {
  yield all([
    watchGetLoggerEventsSaga(),
    watchAddLoggerEventSaga(),
    watchSynchronizeEventsSaga(),
  ]);
}
