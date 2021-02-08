import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../../icons/back.svg";
import "./styles.css";

const InternalLink = ({
  pathname = "/",
  title = "",
  className = "",
  isBack = false,
  ...props
}) => (
  <NavLink
    to={{ pathname }}
    className={`internal-link ${className ? className : ""}`}
    {...props}
  >
    {isBack && <BackIcon className="internal-link__icon" />}
    {title}
  </NavLink>
);

export default InternalLink;
