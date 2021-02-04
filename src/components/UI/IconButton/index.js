import React from "react";

import "./styles.css";

const IconButton = ({ children, className, ...props }) => (
  <button className={`icon-button ${className ? className : ""}`} {...props}>
    {React.cloneElement(children, { className: "icon-button__icon" })}
  </button>
);

export default IconButton;
