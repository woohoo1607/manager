import React from "react";

import "./styles.css";

const NotificationWindow = ({ message = "", variant = "primary" }) => (
  <div className={`popup ${variant ? variant : ""}`}>
    <p>{message}</p>
  </div>
);

export default NotificationWindow;
