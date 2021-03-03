import React from "react";

import NetworkCircle, { statuses } from "../NetworkCircle";

import "./styles.css";

const Item = ({ status = "", description = "" }) => (
  <li className="network-status">
    <NetworkCircle status={status} />
    <p className="network-status__description">- {description}</p>
  </li>
);

const NetworkStatusesList = () => (
  <ul className="network-statuses">
    {statuses.map(({ title, description }, i) => (
      <Item status={title} description={description} key={i} />
    ))}
  </ul>
);

export default NetworkStatusesList;
