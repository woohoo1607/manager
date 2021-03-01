import React from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "../UI/IconButton";
import { switchTheme } from "../../actions/themeActions";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();

  const isDarkMode = useSelector(({ theme: { isDarkMode } }) => isDarkMode);

  const title = isDarkMode ? "Switch to light theme" : "Switch to dark theme";

  const changeTheme = () => dispatch(switchTheme(!isDarkMode));

  return (
    <IconButton
      icon={isDarkMode ? "sun" : "moon"}
      title={title}
      onClick={changeTheme}
    />
  );
};

export default ThemeSwitcher;
