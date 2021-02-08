import React from "react";

import { ReactComponent as EditIcon } from "../../icons/Edit.svg";

const InformationBlock = ({ title = "", handleClick = () => {}, children }) => (
  <div className="user-information-block">
    <div className="user-information-title" onClick={handleClick}>
      {title}
      <EditIcon className="user-information-icon" />
    </div>
    <div className="user-information-list">{children}</div>
  </div>
);

export default InformationBlock;
