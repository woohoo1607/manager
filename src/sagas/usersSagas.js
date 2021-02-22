import { put, call, takeEvery, all } from "redux-saga/effects";

import {
  GET_USERS,
  IS_LOADING,
  UPDATE_USER,
  CREATE_ERROR,
} from "../reducers/usersReducer";
import { CREATE_FIELDS_ERRORS } from "../reducers/userFormReducer";
import { usersService } from "../services/db/UsersService";
import { userFormService } from "../services/db/UserFormService";

import {
  showErrorNotification,
  showSuccessNotification,
} from "../actions/notificationActions";
import {
  generateAvatar,
  generateFakeAccounts,
} from "../helpers/generateAccount";

export const TRIGGER_GET_USERS = "TRIGGER_GET_USERS";
export const TRIGGER_GET_USER = "TRIGGER_GET_USER";
export const TRIGGER_ADD_USER = "TRIGGER_ADD_USER";
export const TRIGGER_REMOVE_USER = "TRIGGER_REMOVE_USER";
export const TRIGGER_UPDATE_USER = "TRIGGER_UPDATE_USER";
export const TRIGGER_GENERATE_USERS = "TRIGGER_GENERATE_USERS";

export function* getUsersSaga() {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const users = yield call(usersService.getAll);
    yield put({
      type: GET_USERS,
      payload: users,
    });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
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
    yield put(showErrorNotification({ message }));
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
    yield put(showSuccessNotification({ message: "User added successfully" }));
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
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
  } catch ({ message }) {
    yield put({
      type: CREATE_FIELDS_ERRORS,
      payload: [{ fieldName: message.split(" ")[0], error: message }],
    });
    yield put(showErrorNotification({ message }));
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
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
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
