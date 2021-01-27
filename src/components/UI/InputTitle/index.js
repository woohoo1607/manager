import React from "react";

import "./styles.css";

const InputTitle = ({ title, isRequired }) => {
  return (
    <div className="input-title-container">
      <p className="input-title">{title}</p>
      {isRequired && <p className="input-title is-required">*</p>}
    </div>
  );
};

export default InputTitle;
