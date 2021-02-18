import React from "react";

import "./styles.css";

const Input = ({ isError, value = "", ...props }) => (
  <input
    className={`input ${isError ? "error" : ""}`}
    value={value}
    {...props}
  />
);

export default Input;
