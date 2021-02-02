import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../../icons/back.svg";
import "./styles.css";

const InternalLink = ({
  pathname = "/",
  title = "",
  className = "",
  icon = "",
  ...props
}) => (
  <NavLink
    to={{ pathname }}
    className={`internal-link ${className ? className : ""}`}
    {...props}
  >
    {icon === "back" && <BackIcon />}
    {title}
  </NavLink>
);

export default InternalLink;
