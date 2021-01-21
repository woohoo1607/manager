import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const btnTypes = {
  primary: {
    backgroundColor: "#5E97F3",
  },
  disable: {
    backgroundColor: "#C1CFE0",
  },
  success: {
    backgroundColor: "#4EE4A5",
  },
};

const Button = ({ color = "primary", type, title, onClick }) => {
  return (
    <button
      className="btn"
      type={type}
      style={{
        ...btnTypes[color],
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
