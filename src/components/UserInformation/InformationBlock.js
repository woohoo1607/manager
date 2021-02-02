import React from "react";

import { ReactComponent as EditIcon } from "../../icons/Edit.svg";

const InformationBlock = ({
  title = "",
  goToEditUser = () => {},
  children,
}) => (
  <div className="user-information-block">
    <div className="user-information-title">
      {title}
      <EditIcon className="user-information-icon" onClick={goToEditUser} />
    </div>
    <div className="user-information-list">{children}</div>
  </div>
);

export default InformationBlock;
