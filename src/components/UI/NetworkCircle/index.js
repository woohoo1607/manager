import React from "react";

import "./styles.css";

export const statuses = [
  { title: "online", description: "the application is online" },
  { title: "offline", description: "the application is offline" },
  {
    title: "not-synchronized",
    description: "the application is offline and there is unsaved data",
  },
  {
    title: "synchronization",
    description: "the application is online and it syncs",
  },
];

const NetworkCircle = ({ status = "offline" }) => {
  const currentStatus =
    statuses.findIndex(({ title: foundTitle }) => foundTitle === status) === -1
      ? "offline"
      : status;
  return (
    <div
      className={`network-circle network-circle_${currentStatus}`}
      title={currentStatus}
    ></div>
  );
};

export default NetworkCircle;
