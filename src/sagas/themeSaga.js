import { put, call, takeEvery, all } from "redux-saga/effects";

import { getData, setData } from "../helpers/localStorageHelper";
import { showErrorNotification } from "../actions/notificationActions";

import { UPDATE_THEME } from "../reducers/themeReducer";

export const TRIGGER_UPDATE_THEME = "TRIGGER_UPDATE_THEME";
export const TRIGGER_GET_THEME = "TRIGGER_GET_THEME";

export function* getThemeSaga() {
  try {
    const isDarkMode = yield call(getData, "isDarkMode");
    if (isDarkMode) {
      yield put({ type: UPDATE_THEME, payload: isDarkMode });
    }
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchGetThemeSaga() {
  yield takeEvery(TRIGGER_GET_THEME, getThemeSaga);
}

export function* updateThemeSaga({ isDarkMode = false }) {
  try {
    yield call(setData, "isDarkMode", isDarkMode);
    yield put({ type: UPDATE_THEME, payload: isDarkMode });
  } catch ({ message }) {
    yield put(showErrorNotification({ message }));
  }
}

export function* watchUpdateThemeSaga() {
  yield takeEvery(TRIGGER_UPDATE_THEME, updateThemeSaga);
}

export default function* themeSaga() {
  yield all([watchUpdateThemeSaga(), watchGetThemeSaga()]);
}
