import React from "react";

import "./styles.css";

const statuses = ["online", "offline", "synchronization", "not-synchronized"];

const NetworkCircle = ({ status = "offline" }) => {
  const currentStatus = statuses.includes(status) ? status : "offline";
  return (
    <div
      className={`network-circle network-circle_${currentStatus}`}
      title={currentStatus}
    ></div>
  );
};

export default NetworkCircle;
