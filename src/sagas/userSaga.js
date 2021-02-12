import { put, call, takeEvery, all } from "redux-saga/effects";
import { usersService } from "../services/db/UsersService";
import {
  ADD_ACCOUNT_DATA,
  ADD_ACCOUNT_DATA_SUCCESS,
  GET_TEMP_USER_DATA,
  GET_TEMP_USER_DATA_SUCCESS,
  GET_USER_DATA,
  REMOVE_TEMP_USER_DATA,
  REMOVE_TEMP_USER_DATA_SUCCESS,
} from "../reducers/userReducer";
import { sendErrorNotification } from "../actions/notificationActions";
import { usersTempDataService } from "../services/db/UsersTempDataService";

export function* getUserSaga({ id }) {
  try {
    const res = yield call(usersService.getByID, id);
    yield put({ type: ADD_ACCOUNT_DATA_SUCCESS, payload: res });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchGetUserSaga() {
  yield takeEvery(GET_USER_DATA, getUserSaga);
}

export function* addUserDataSaga({
  userData,
  meta: { redirect, path } = { redirect: () => {}, path: "" },
}) {
  try {
    const { username } = userData;

    if (username) {
      const res = yield call(usersService.checkUsername, username);
      if (res) {
        throw new Error("username already exists");
      }
    }

    const res = yield call(usersTempDataService.addData, userData);
    yield put({ type: ADD_ACCOUNT_DATA_SUCCESS, payload: res });
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchAddUserDataSaga() {
  yield takeEvery(ADD_ACCOUNT_DATA, addUserDataSaga);
}

export function* getTempUserDataSaga() {
  try {
    const res = yield call(usersTempDataService.getAll);
    yield put({ type: GET_TEMP_USER_DATA_SUCCESS, payload: res[0] || null });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchGetTempUserDataSaga() {
  yield takeEvery(GET_TEMP_USER_DATA, getTempUserDataSaga);
}

export function* removeTempUserDataSaga() {
  try {
    yield call(usersTempDataService.clearAll);
    yield put({ type: REMOVE_TEMP_USER_DATA_SUCCESS });
  } catch ({ message }) {
    yield put(sendErrorNotification({ message }));
  }
}

export function* watchRemoveTempUserDataSaga() {
  yield takeEvery(REMOVE_TEMP_USER_DATA, removeTempUserDataSaga);
}

export default function* userSaga() {
  yield all([
    watchGetUserSaga(),
    watchAddUserDataSaga(),
    watchGetTempUserDataSaga(),
    watchRemoveTempUserDataSaga(),
  ]);
}
