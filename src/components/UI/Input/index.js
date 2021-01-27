import React from "react";

import "./styles.css";

const Input = ({ isError, ...props }) => {
  return <input className={isError ? "input error" : "input"} {...props} />;
};

export default Input;
