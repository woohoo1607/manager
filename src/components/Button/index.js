import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Button = ({ type = "submit", children, className, ...props }) => {
  return (
    <button className={"button " + className} type={type} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  btnColors: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
