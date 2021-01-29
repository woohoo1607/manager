import React from "react";

import "./styles.css";

const InputContainer = ({ children, style }) => (
  <div className="input-container" style={style}>
    {children}
  </div>
);

export default InputContainer;
