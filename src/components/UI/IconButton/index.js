import React from "react";

import "./styles.css";
import { ReactComponent as MinusIcon } from "../../../icons/minus.svg";
import { ReactComponent as EditIcon } from "../../../icons/Edit.svg";
import { ReactComponent as CloseIcon } from "../../../icons/Close.svg";

const IconButton = ({
  children,
  className,
  isMinusIcon = false,
  isEditIcon = false,
  isCloseIcon = false,
  ...props
}) => (
  <button className={`icon-button ${className ? className : ""}`} {...props}>
    {isMinusIcon && <MinusIcon />}
    {isEditIcon && <EditIcon />}
    {isCloseIcon && <CloseIcon />}
  </button>
);

export default IconButton;
