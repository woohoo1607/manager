import React from "react";

import "./styles.css";

const TextArea = ({ isError, ...props }) => {
  return <textarea className={`text-area ${isError && "error"}`} {...props} />;
};

export default TextArea;
