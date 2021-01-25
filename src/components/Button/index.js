import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const btnColors = {
  blue: {
    backgroundColor: "#5E97F3",
  },
  gray: {
    backgroundColor: "#C1CFE0",
  },
  green: {
    backgroundColor: "#4EE4A5",
  },
};

const Button = ({ color = "blue", type = "button", children, ...props }) => {
  return (
    <button
      className="btn"
      type={type}
      style={{
        ...btnColors[color],
        ...props.style,
      }}
      {...props}
    >
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
