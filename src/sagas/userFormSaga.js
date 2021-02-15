import { put, call, takeEvery, all } from "redux-saga/effects";
import { usersService } from "../services/db/UsersService";

import { sendErrorNotification } from "../actions/notificationActions";
import { userFormService } from "../services/db/UserFormService";
import {
  GET_USER_FORM,
  REMOVE_USER_FORM,
  UPDATE_AVAILABLE_STATUS,
  UPDATE_USER_FORM,
} from "../reducers/userFormReducer";

export const TRIGGER_GET_USER_FORM = "TRIGGER_GET_USER_FORM";
export const TRIGGER_CHECK_USER_FORM = "TRIGGER_CHECK_USER_FORM";
export const TRIGGER_UPDATE_USER_FORM = "TRIGGER_UPDATE_USER_FORM";
export const TRIGGER_REMOVE_USER_FORM = "TRIGGER_REMOVE_USER_FORM";

export function* getUserFormSaga({
  meta: { redirect, path } = { redirect: () => {}, path: "" },
}) {
  try {
    const res = yield call(userFormService.getAll);
    yield put({ type: GET_USER_FORM, payload: res[0] || null });
    yield put({ type: UPDATE_AVAILABLE_STATUS, payload: false });
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchGetUserFormSaga() {
  yield takeEvery(TRIGGER_GET_USER_FORM, getUserFormSaga);
}

export function* checkUserFormSaga() {
  try {
    const res = yield call(userFormService.getAll);
    if (res[0]) {
      yield put({ type: UPDATE_AVAILABLE_STATUS, payload: true });
    }
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchCheckUserFormSaga() {
  yield takeEvery(TRIGGER_CHECK_USER_FORM, checkUserFormSaga);
}

export function* updateUserFormSaga({
  userData,
  meta: { redirect, path } = { redirect: () => {}, path: "" },
}) {
  try {
    const { username, email } = userData;

    if (username) {
      const res = yield call(usersService.checkUsername, username);
      if (res) {
        throw new Error("username already exists");
      }
    }
    if (email) {
      const res = yield call(usersService.checkEmail, email);
      if (res) {
        throw new Error("email already exists");
      }
    }
    const res = yield call(userFormService.addData, userData);
    console.log(userData);
    yield put({ type: UPDATE_USER_FORM, payload: res });
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchAddUserFormSaga() {
  yield takeEvery(TRIGGER_UPDATE_USER_FORM, updateUserFormSaga);
}

export function* removeUserFormSaga() {
  try {
    yield call(userFormService.clearAll);
    yield put({ type: REMOVE_USER_FORM });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchRemoveUserFormSaga() {
  yield takeEvery(TRIGGER_REMOVE_USER_FORM, removeUserFormSaga);
}

export default function* userFormSaga() {
  yield all([
    watchGetUserFormSaga(),
    watchAddUserFormSaga(),
    watchRemoveUserFormSaga(),
    watchCheckUserFormSaga(),
  ]);
}
