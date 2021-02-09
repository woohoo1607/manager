import { put, call, takeEvery, all } from "redux-saga/effects";
import { usersService } from "../services/db/UsersService";
import {
  ADD_ACCOUNT_DATA,
  ADD_ACCOUNT_DATA_SUCCESS,
  GET_USER_DATA,
} from "../reducers/userReducer";
import { openPopUp } from "../reducers/actions";
import { setData } from "../helpers/localStorageHelper";
import { dataURItoBlob } from "../helpers/dataURItoBlob";
import { convertBlobToBase64 } from "../helpers/convertBlobToBase64";

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

export function* addUserDataSaga({
  userData,
  meta: { redirect, path } = { redirect: () => {}, path: "" },
}) {
  try {
    if ("username" in userData) {
      const res = yield call(usersService.getFromIndex, {
        index: "username",
        query: userData.username,
      });
      if (res) {
        throw new Error("username already exists");
      }
    }
    const userDataForLocalStorage = { ...userData };

    if ("avatar" in userData && userData.avatar !== null) {
      if (userData.avatar instanceof Blob) {
        userDataForLocalStorage.avatar = yield call(
          convertBlobToBase64,
          userData.avatar
        );
      } else {
        userData.avatar = dataURItoBlob(userData.avatar);
      }
    }

    yield call(setData, "newUserData", JSON.stringify(userDataForLocalStorage));
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
