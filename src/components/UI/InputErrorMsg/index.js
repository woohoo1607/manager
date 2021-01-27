import React from "react";

import "./styles.css";

const InputErrorMsg = ({ error }) => {
  return <p className="input-error">{error}</p>;
};

export default InputErrorMsg;
