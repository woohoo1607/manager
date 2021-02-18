import React from "react";

import "./styles.css";

const RadioBtn = ({ checked, isError, ...props }) => (
  <label className={`radio-container  ${checked ? "checked" : ""}`}>
    {props.value}
    <input type="radio" {...props} />
    <span className={`checkmark  ${checked && " checked"}`}></span>
  </label>
);

export default RadioBtn;
