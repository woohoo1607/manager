import { put, call, takeEvery, all } from "redux-saga/effects";
import {
  ADD_USER,
  ADD_USER_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  IS_LOADING,
  UPDATE_USER,
} from "../reducers/usersReducer";
import { usersService } from "../services/db/UsersService";

export function* getUsersSaga() {
  try {
    yield put({ type: IS_LOADING, payload: true });
    const res = yield call(usersService.getAll);
    yield put({ type: GET_USERS_SUCCESS, payload: res });
    yield put({ type: IS_LOADING, payload: false });
  } catch (error) {
    yield put({ type: GET_USERS_ERROR, payload: error });
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS, getUsersSaga);
}

export function* addUserSaga({ user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.add, user);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: GET_USERS_ERROR, payload: error });
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER, addUserSaga);
}

export function* updateUserSaga({ user }) {
  try {
    yield put({ type: IS_LOADING, payload: true });
    yield call(usersService.put, user);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: GET_USERS_ERROR, payload: error });
    yield put({ type: IS_LOADING, payload: false });
  }
}

export function* watchUpdateUserSaga() {
  yield takeEvery(UPDATE_USER, updateUserSaga);
}

export default function* usersSaga() {
  yield all([watchGetUsersSaga(), watchAddUserSaga()]);
}
