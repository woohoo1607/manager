import { put, call, takeEvery, all, select } from "redux-saga/effects";
import { usersService } from "../services/db/UsersService";

import { showErrorNotification } from "../actions/notificationActions";
import { userFormService } from "../services/offlineDb/UserFormService";
import {
  CREATE_FIELDS_ERRORS,
  REMOVE_USER_FORM,
  UPDATE_AVAILABLE_STATUS,
  UPDATE_USER_FORM,
} from "../reducers/userFormReducer";
import { offlineUsersService } from "../services/offlineDb/OfflineUsersService";

export const TRIGGER_GET_USER_FORM = "TRIGGER_GET_USER_FORM";
export const TRIGGER_CHECK_USER_FORM = "TRIGGER_CHECK_USER_FORM";
export const TRIGGER_UPDATE_USER_FORM = "TRIGGER_UPDATE_USER_FORM";
export const TRIGGER_REMOVE_USER_FORM = "TRIGGER_REMOVE_USER_FORM";

const getNetworkStatus = ({
  networkStatus: { isOnline } = { isOnline: false },
}) => isOnline;

export function* getUserFormSaga({
  meta: { redirect, path } = { redirect: () => {}, path: "" },
}) {
  try {
    const res = yield call(userFormService.getAll);
    if (Array.isArray(res) && res.length) {
      const { slug = "" } = res[0];
      yield put({ type: UPDATE_USER_FORM, payload: res[0] });
      yield put({ type: UPDATE_AVAILABLE_STATUS, payload: false });
      yield call(redirect, `${path}/${slug}`);
    } else {
      throw new Error("invalid data");
    }
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
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
    yield put(showErrorNotification({ message }));
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
    const { username = "", email = "" } = userData;
    const isOnline = yield select(getNetworkStatus);
    if (!isOnline) {
      const users = yield call(offlineUsersService.getAll);
      const foundUser = users.find(
        ({ username: foundedUsername, email: foundedEmail }) =>
          foundedUsername === username || email === foundedEmail
      );
      if (foundUser) {
        const fieldError =
          foundUser.username === username ? "username" : "email";
        yield put({
          type: CREATE_FIELDS_ERRORS,
          payload: [
            { fieldName: fieldError, error: `${fieldError} already exists` },
          ],
        });
        throw new Error(`${fieldError} already exists`);
      }
    } else {
      const errorFields = [];
      const isExistUsername = Boolean(
        yield call(usersService.checkUsername, username)
      );
      const isExistEmail = yield call(usersService.checkEmail, email);
      isExistUsername ? errorFields.push("username") : errorFields.push();
      isExistEmail ? errorFields.push("email") : errorFields.push();
      if (errorFields.length) {
        yield put({
          type: CREATE_FIELDS_ERRORS,
          payload: errorFields.map((name) => ({
            fieldName: name,
            error: `${name} already exists`,
          })),
        });
        throw new Error(`${errorFields.join(", ")} already exists`);
      }
    }
    const res = yield call(userFormService.addData, userData);
    yield put({ type: UPDATE_USER_FORM, payload: res });
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
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
    yield put(showErrorNotification({ message }));
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
