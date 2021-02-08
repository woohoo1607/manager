import { put, call, takeEvery, all } from "redux-saga/effects";
import { usersService } from "../services/db/UsersService";
import {
  ADD_ACCOUNT_DATA,
  ADD_ACCOUNT_DATA_SUCCESS,
  GET_USER_DATA,
} from "../reducers/userReducer";
import { openPopUp } from "../reducers/actions";
import { setData } from "../helpers/localStorageHelper";

export function* getUserSaga({ id }) {
  try {
    const res = yield call(usersService.getByID, id);
    yield put({ type: ADD_ACCOUNT_DATA_SUCCESS, payload: res });
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
  }
}

export function* watchGetUserSaga() {
  yield takeEvery(GET_USER_DATA, getUserSaga);
}

export function* addUserDataSaga({ userData, meta: { redirect, path } }) {
  try {
    yield call(setData, "newUserData", JSON.stringify(userData));
    yield put({ type: ADD_ACCOUNT_DATA_SUCCESS, payload: userData });
    yield call(redirect, path);
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
  }
}

export function* watchAddUserDataSaga() {
  yield takeEvery(ADD_ACCOUNT_DATA, addUserDataSaga);
}

export default function* userSaga() {
  yield all([watchGetUserSaga(), watchAddUserDataSaga()]);
}
