import { put, call, takeEvery, all } from "redux-saga/effects";
import { usersService } from "../services/db/UsersService";
import { ADD_ACCOUNT_DATA, GET_USER_DATA } from "../reducers/userReducer";
import { openPopUp } from "../reducers/actions";

export function* getUserSaga({ id }) {
  try {
    const res = yield call(usersService.getByID, id);
    yield put({ type: ADD_ACCOUNT_DATA, payload: res });
  } catch ({ message }) {
    yield put(openPopUp({ msg: message, variant: "error" }));
  }
}

export function* watchGetUserSaga() {
  yield takeEvery(GET_USER_DATA, getUserSaga);
}

export default function* userSaga() {
  yield all([watchGetUserSaga()]);
}
