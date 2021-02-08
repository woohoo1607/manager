import React from "react";

import "./styles.css";

const FileInputBase = ({ title = "add avatar", onChange = () => {} }) => (
  <label className="file-input">
    <input
      type="file"
      onChange={onChange}
      accept="image/png, image/jpeg, image/jpg"
    />
    + {title}
  </label>
);

export default FileInputBase;
