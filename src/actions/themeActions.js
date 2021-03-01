import { UPDATE_THEME } from "../reducers/themeReducer";

export const switchTheme = (payload) => ({
  type: UPDATE_THEME,
  payload,
});
