import React from "react";

import "./styles.css";
import { ReactComponent as MinusIcon } from "../../../icons/minus.svg";
import { ReactComponent as EditIcon } from "../../../icons/Edit.svg";
import { ReactComponent as CloseIcon } from "../../../icons/Close.svg";

const icons = [
  { name: "minus", component: MinusIcon },
  { name: "edit", component: EditIcon },
  { name: "close", component: CloseIcon },
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
      <Icon {...iconProps} />
    </button>
  );
};

export default IconButton;
