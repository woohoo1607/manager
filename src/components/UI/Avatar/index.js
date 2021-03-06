import React, { useMemo } from "react";

import UserIcon from "../../../icons/list-of-users.svg";

import "./styles.css";

const getAvatar = (avatar) =>
  avatar instanceof Blob ? URL.createObjectURL(avatar) : UserIcon;

const Avatar = ({ avatar, style = {} }) => {
  const src = useMemo(() => getAvatar(avatar), [avatar]);

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
