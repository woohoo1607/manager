import { put, call, takeEvery, all } from "redux-saga/effects";
import {
  GET_USER,
  GET_USERS,
  IS_LOADING,
  UPDATE_USER,
} from "../reducers/usersReducer";

import { usersService } from "../services/db/UsersService";
import {
  sendErrorNotification,
  sendNotification,
} from "../actions/notificationActions";
import { userFormService } from "../services/db/UserFormService";

export const TRIGGER_GET_USERS = "TRIGGER_GET_USERS";
export const TRIGGER_GET_USER = "TRIGGER_GET_USER";
export const TRIGGER_ADD_USER = "TRIGGER_ADD_USER";
export const TRIGGER_REMOVE_USER = "TRIGGER_REMOVE_USER";
export const TRIGGER_UPDATE_USER = "TRIGGER_UPDATE_USER";

export function* getUsersSaga() {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const users = yield call(usersService.getAll);
    yield put({
      type: GET_USERS,
      payload: users,
    });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
    yield put({ type: GET_USER, payload: res });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
  yield put({ type: IS_LOADING, payload: false });
}

export function* watchGetUserSaga() {
  yield takeEvery(TRIGGER_GET_USER, getUserSaga);
}

export function* addUserSaga({ meta: { redirect, path }, user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.addUser, user);
    yield call(userFormService.clearAll);
    yield put({ type: TRIGGER_GET_USERS });
    yield put(sendNotification({ message: "User added successfully" }));
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
    yield put(sendNotification({ message: "User updated successfully" }));
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
    yield put(sendNotification({ message: "User deleted successfully" }));
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchDeleteUserSaga() {
  yield takeEvery(TRIGGER_REMOVE_USER, deleteUserSaga);
}

export default function* usersSaga() {
  yield all([
    watchGetUsersSaga(),
    watchGetUserSaga(),
    watchAddUserSaga(),
    watchUpdateUserSaga(),
    watchDeleteUserSaga(),
  ]);
}
