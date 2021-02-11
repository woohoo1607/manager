import React from "react";
import UserIcon from "../../../icons/list-of-users.svg";

import "./styles.css";

const Avatar = ({ avatar, style = {} }) => {
  const src =
    avatar instanceof Blob ? URL.createObjectURL(avatar) : avatar || UserIcon;
  return (
    <div className="avatar-container" style={style}>
      <img
        className={`avatar ${src === UserIcon ? "default" : ""}`}
        src={src}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
