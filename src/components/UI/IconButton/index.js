import React from "react";

import { ReactComponent as MinusIcon } from "../../../icons/minus.svg";
import { ReactComponent as EditIcon } from "../../../icons/Edit.svg";
import { ReactComponent as CloseIcon } from "../../../icons/Close.svg";
import { ReactComponent as MoonIcon } from "../../../icons/moon.svg";
import { ReactComponent as SunIcon } from "../../../icons/sun.svg";

import "./styles.css";

const icons = [
  { name: "minus", component: MinusIcon },
  { name: "edit", component: EditIcon },
  { name: "close", component: CloseIcon },
  { name: "moon", component: MoonIcon },
  { name: "sun", component: SunIcon },
];

const IconButton = ({
  children,
  className,
  icon = "minus",
  iconProps = {},
  ...props
}) => {
  const { component: Icon } = icons.find(({ name }) => name === icon) || {
    component: MinusIcon,
  };

  return (
    <button className={`icon-button ${className ? className : ""}`} {...props}>
      <Icon {...iconProps} className="icon-button__icon" />
    </button>
  );
};

export default IconButton;
