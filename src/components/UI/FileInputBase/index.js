import React from "react";

import "./styles.css";

const FileInputBase = ({ title = "add avatar", onChange = () => {} }) => (
  <label className="file-input">
    <input type="file" onChange={onChange} />+ {title}
  </label>
);

export default FileInputBase;
