import { put, call, takeEvery, all } from "redux-saga/effects";
import {
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  IS_LOADING,
  UPDATE_USER,
} from "../reducers/usersReducer";

import { usersService } from "../services/db/UsersService";
import { getUserData } from "../actions/userActions";
import { ADD_USER, ADD_USER_SUCCESS } from "../reducers/userReducer";
import { removeData } from "../helpers/localStorageHelper";
import { openNotification } from "../actions/notificationActions";

export function* getUsersSaga({ page }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const res = yield call(usersService.getSomeUsers, page);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: { ...res, currentPage: page },
    });
    yield put({ type: IS_LOADING, payload: false });
  } catch ({ message }) {
    yield put(openNotification({ message, variant: "error" }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS, getUsersSaga);
}

export function* addUserSaga({ meta: { redirect, path }, user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.addUser, user);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: GET_USERS });
    yield put(openNotification({ message: "User added successfully" }));
    yield call(redirect, path);
    yield call(removeData, "newUserData");
  } catch ({ message }) {
    yield put(openNotification({ message, variant: "error" }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER, addUserSaga);
}

export function* updateUserSaga({ user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const id = yield call(usersService.updateUser, user);
    yield put(getUserData(id));
    yield put({ type: IS_LOADING, payload: false });
    yield put(openNotification({ message: "User updated successfully" }));
  } catch ({ message }) {
    yield put(openNotification({ message, variant: "error" }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchUpdateUserSaga() {
  yield takeEvery(UPDATE_USER, updateUserSaga);
}

export function* deleteUserSaga({ id }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.delete, id);
    yield put({ type: DELETE_USER_SUCCESS });
    yield put({ type: GET_USERS });
    yield put(openNotification({ message: "User deleted successfully" }));
  } catch ({ message }) {
    yield put(openNotification({ message, variant: "error" }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchDeleteUserSaga() {
  yield takeEvery(DELETE_USER, deleteUserSaga);
}

export default function* usersSaga() {
  yield all([
    watchGetUsersSaga(),
    watchAddUserSaga(),
    watchUpdateUserSaga(),
    watchDeleteUserSaga(),
  ]);
}
