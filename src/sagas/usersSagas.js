import { put, call, takeEvery, all } from "redux-saga/effects";

import {
  GET_USERS,
  IS_LOADING,
  UPDATE_USER,
  CREATE_ERROR,
} from "../reducers/usersReducer";
import { CREATE_FIELDS_ERRORS } from "../reducers/userFormReducer";
import { usersService } from "../services/db/UsersService";
import { userFormService } from "../services/offlineDb/UserFormService";
import { offlineUsersService } from "../services/offlineDb/OfflineUsersService";

import {
  showErrorNotification,
  showSuccessNotification,
} from "../actions/notificationActions";
import {
  generateAvatar,
  generateFakeAccounts,
} from "../helpers/generateAccount";
import { addLoggerEvent } from "../actions/loggerActions";

export const TRIGGER_GET_USERS = "TRIGGER_GET_USERS";
export const TRIGGER_GET_USER = "TRIGGER_GET_USER";
export const TRIGGER_ADD_USER = "TRIGGER_ADD_USER";
export const TRIGGER_REMOVE_USER = "TRIGGER_REMOVE_USER";
export const TRIGGER_UPDATE_USER = "TRIGGER_UPDATE_USER";
export const TRIGGER_GENERATE_USERS = "TRIGGER_GENERATE_USERS";

export const FETCH_ERROR = "Failed to fetch";

export function* getUsersSaga() {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const users = yield call(usersService.getAll);
    yield put({
      type: GET_USERS,
      payload: users,
    });
    offlineUsersService.synchronization(users);
  } catch ({ message }) {
    const isOfflineError = message === FETCH_ERROR;
    if (isOfflineError) {
      const users = yield call(offlineUsersService.getAll);
      yield put({
        type: GET_USERS,
        payload: users,
      });
    } else {
      yield put(showErrorNotification({ message }));
    }
  }
  yield put({ type: IS_LOADING, payload: false });
}

export function* watchGetUsersSaga() {
  yield takeEvery(TRIGGER_GET_USERS, getUsersSaga);
}

export function* getUserSaga({ id }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const res = yield call(usersService.getByID, id);
    if (res) {
      yield put({ type: UPDATE_USER, payload: res });
    } else {
      yield put({
        type: CREATE_ERROR,
        payload: { errorStatusCode: 404, errorMessage: "User not found" },
      });
    }
  } catch ({ message }) {
    const isOfflineError = message === FETCH_ERROR;
    if (isOfflineError) {
      const res = yield call(offlineUsersService.getByID, id);
      if (res) {
        yield put({ type: UPDATE_USER, payload: res });
      } else {
        yield put({
          type: CREATE_ERROR,
          payload: { errorStatusCode: 404, errorMessage: "User not found" },
        });
      }
    } else {
      yield put(showErrorNotification({ message }));
    }
  }
  yield put({ type: IS_LOADING, payload: false });
}

export function* watchGetUserSaga() {
  yield takeEvery(TRIGGER_GET_USER, getUserSaga);
}

export function* addUserSaga({ meta: { redirect, path }, user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const res = yield call(usersService.addUser, user);
    yield call(userFormService.clearAll);
    yield put({ type: TRIGGER_GET_USERS });
    yield put(showSuccessNotification({ message: "User added successfully" }));
    yield put(
      addLoggerEvent({
        eventType: "add user",
        data: user,
        date: new Date(),
      })
    );
    yield call(redirect, path);
    offlineUsersService.add(res);
  } catch ({ message }) {
    const isOfflineError = message === FETCH_ERROR;
    yield put(
      addLoggerEvent({
        eventType: "add user",
        data: user,
        date: new Date(),
        isAwaitingDispatch: isOfflineError,
        error: message,
        isSuccess: false,
      })
    );
    if (isOfflineError) {
      yield call(offlineUsersService.addUser, user);
      yield call(userFormService.clearAll);
      yield put({ type: TRIGGER_GET_USERS });
      yield put(
        showSuccessNotification({ message: "User added successfully" })
      );
    } else {
      yield put(showErrorNotification({ message }));
    }
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(TRIGGER_ADD_USER, addUserSaga);
}

export function* updateUserSaga({ user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const updateUser = yield call(usersService.updateUser, user);
    yield put({ type: UPDATE_USER, payload: updateUser });
    yield put(
      showSuccessNotification({ message: "User updated successfully" })
    );
    yield put(
      addLoggerEvent({
        eventType: "update user",
        data: user,
        date: new Date(),
      })
    );
    offlineUsersService.put(user);
  } catch ({ message }) {
    const isOfflineError = message === FETCH_ERROR;
    yield put(
      addLoggerEvent({
        eventType: "update user",
        data: user,
        date: new Date(),
        isAwaitingDispatch: isOfflineError,
        error: message,
        isSuccess: false,
      })
    );
    if (isOfflineError) {
      yield call(offlineUsersService.put, user);
      yield put({ type: UPDATE_USER, payload: user });
      yield put(
        showSuccessNotification({ message: "User updated successfully" })
      );
    } else {
      yield put({
        type: CREATE_FIELDS_ERRORS,
        payload: [{ fieldName: message.split(" ")[0], error: message }],
      });
      yield put(showErrorNotification({ message }));
    }
  }
  yield put({ type: IS_LOADING, payload: false });
}

export function* watchUpdateUserSaga() {
  yield takeEvery(TRIGGER_UPDATE_USER, updateUserSaga);
}

export function* deleteUserSaga({ id }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.delete, id);
    yield put({ type: TRIGGER_GET_USERS });
    yield put(
      showSuccessNotification({ message: "User deleted successfully" })
    );
    yield put(
      addLoggerEvent({
        eventType: "delete user",
        data: id,
        date: new Date(),
      })
    );
    offlineUsersService.delete(id);
  } catch ({ message }) {
    const isOfflineError = message === FETCH_ERROR;
    yield put(
      addLoggerEvent({
        eventType: "delete user",
        data: id,
        date: new Date(),
        isAwaitingDispatch: isOfflineError,
        error: message,
        isSuccess: false,
      })
    );
    if (isOfflineError) {
      yield call(offlineUsersService.delete, id);
      yield put({ type: TRIGGER_GET_USERS });
      yield put(
        showSuccessNotification({ message: "User deleted successfully" })
      );
    } else {
      yield put(showErrorNotification({ message }));
    }
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchDeleteUserSaga() {
  yield takeEvery(TRIGGER_REMOVE_USER, deleteUserSaga);
}

export function* generateUsersSaga({ count }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const accounts = yield call(generateFakeAccounts, count);
    const avatars = yield all(accounts.map(() => call(generateAvatar)));
    const fakeAccounts = avatars.map((avatar, i) => {
      accounts[i].avatar = avatar;
      return accounts[i];
    });
    yield call(usersService.clearAll);
    yield call(usersService.import, fakeAccounts);
    yield put({
      type: GET_USERS,
      payload: [],
    });
    yield put({ type: TRIGGER_GET_USERS });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
  yield put({ type: IS_LOADING, payload: false });
}

export function* watchGenerateUsersSaga() {
  yield takeEvery(TRIGGER_GENERATE_USERS, generateUsersSaga);
}

export default function* usersSaga() {
  yield all([
    watchGetUsersSaga(),
    watchGetUserSaga(),
    watchAddUserSaga(),
    watchUpdateUserSaga(),
    watchDeleteUserSaga(),
    watchGenerateUsersSaga(),
  ]);
}
