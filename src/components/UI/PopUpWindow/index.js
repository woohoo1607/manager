import React from "react";

import "./styles.css";

const PopUpWindow = ({ msg = "", variant = "primary" }) => {
  return (
    <div className={`popup ${variant ? variant : ""}`}>
      <p>{msg}</p>
    </div>
  );
};

export default PopUpWindow;
