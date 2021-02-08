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
import { getUserData, openPopUp } from "../reducers/actions";
import { ADD_USER, ADD_USER_SUCCESS } from "../reducers/userReducer";
import { removeData } from "../helpers/localStorageHelper";

export function* getUsersSaga() {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const res = yield call(usersService.getAll);
    yield put({ type: GET_USERS_SUCCESS, payload: res });
    yield put({ type: IS_LOADING, payload: false });
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS, getUsersSaga);
}

export function* addUserSaga({ meta: { redirect, path }, user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.add, user);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: GET_USERS });
    yield put(openPopUp({ msg: "User added successfully" }));
    yield call(redirect, path);
    yield call(removeData, "newUserData");
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER, addUserSaga);
}

export function* updateUserSaga({ user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const id = yield call(usersService.put, user);
    yield put(getUserData(id));
    yield put({ type: IS_LOADING, payload: false });
    yield put(openPopUp({ msg: "User updated successfully" }));
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
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
    yield put(openPopUp({ msg: "User deleted successfully" }));
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
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
