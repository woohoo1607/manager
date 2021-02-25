import React from "react";

import NetworkCircle from "../NetworkCircle";

import "./styles.css";

const Item = ({ status = "", description = "" }) => (
  <li className="network-status">
    <NetworkCircle status={status} />
    <p className="network-status__description">{description}</p>
  </li>
);

const NetworkStatusesList = () => (
  <ul className="network-statuses">
    <Item status="online" description="the application is online" />
    <Item status="offline" description="the application is offline" />
    <Item
      status="not-synchronized"
      description="the application is offline and there is unsaved data"
    />
    <Item
      status="synchronization"
      description="the application is online and it syncs"
    />
  </ul>
);

export default NetworkStatusesList;
