import React from "react";

import "./styles.css";

const InputTitle = ({ title, isRequired }) => (
  <div className="input-title-container">
    <p className="input-title">
      {title} {isRequired && <span>*</span>}
    </p>
  </div>
);

export default InputTitle;
