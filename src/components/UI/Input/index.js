import React from "react";

import "./styles.css";

const Input = ({ isError, isSecondaryColor, ...props }) => {
  return (
    <input
      className={`input ${isError ? "error" : ""} ${
        isSecondaryColor ? "input-secondary" : ""
      }`}
      {...props}
    />
  );
};

export default Input;
