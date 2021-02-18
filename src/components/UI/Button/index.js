import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Button = ({ type = "submit", children, className, ...props }) => (
  <button
    className={`button ${className ? className : ""}`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
