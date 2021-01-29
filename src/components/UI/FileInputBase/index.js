import React from "react";

import "./styles.css";

const FileInputBase = ({ value = "add avatar", onChange = () => {} }) => (
  <label className="file-input">
    <input type="file" onChange={onChange} />+ {value}
  </label>
);

export default FileInputBase;
