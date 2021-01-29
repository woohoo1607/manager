import React from "react";

import "./styles.css";

const Checkbox = ({ checked, isError, ...props }) => {
  return (
    <label className={`checkbox-container ${checked ? "checked" : ""}`}>
      {props.value}
      <input type="checkbox" {...props} />
      <span className={`checkmark-box ${checked && "checked"}`}></span>
    </label>
  );
};

export default Checkbox;
