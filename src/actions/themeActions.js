import { TRIGGER_GET_THEME, TRIGGER_UPDATE_THEME } from "../sagas/themeSaga";

export const switchTheme = (isDarkMode) => ({
  type: TRIGGER_UPDATE_THEME,
  isDarkMode,
});

export const getTheme = () => ({
  type: TRIGGER_GET_THEME,
});
