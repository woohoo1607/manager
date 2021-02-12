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
import {
  sendErrorNotification,
  sendNotification,
} from "../actions/notificationActions";
import { usersTempDataService } from "../services/db/UsersTempDataService";

export function* getUsersSaga() {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const res = yield call(usersService.getAll);
    yield put({ type: GET_USERS_SUCCESS, payload: res });
    yield put({ type: IS_LOADING, payload: false });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
    yield call(usersTempDataService.clearAll);
    yield put({ type: GET_USERS });
    yield put(sendNotification({ message: "User added successfully" }));
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
    yield put(sendNotification({ message: "User updated successfully" }));
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
    yield put(sendNotification({ message: "User deleted successfully" }));
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
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
