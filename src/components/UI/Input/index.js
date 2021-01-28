import React from "react";

import "./styles.css";

const Input = ({ isError, ...props }) => {
  return <input className={`input ${isError && "error"}`} {...props} />;
};

export default Input;
