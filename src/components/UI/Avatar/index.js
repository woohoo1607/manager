import React from "react";
import { ReactComponent as UserIcon } from "../../../icons/list-of-users.svg";

import "./styles.css";

const Avatar = ({ avatar, style }) => (
  <div className="avatar-container" style={style}>
    {avatar ? (
      <img className="avatar" src={URL.createObjectURL(avatar)} alt="avatar" />
    ) : (
      <UserIcon className="avatar default" />
    )}
  </div>
);

export default Avatar;
