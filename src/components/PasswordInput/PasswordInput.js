import React, { useState } from "react";

import "./styles.css";
import EyeIcon from "../../icons/eye.svg";
import EyeStrikeIcon from "../../icons/eye-strike.svg";
import Input from "../Input";

const PasswordInput = ({ ...props }) => {
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const changePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setType(type === "password" ? "text" : "password");
  };
  return (
    <>
      <Input {...props} type={type}>
        <button
          className="input-img"
          onClick={changePasswordVisibility}
          type="button"
          style={{
            background: `url(${
              showPassword ? EyeStrikeIcon : EyeIcon
            }) center center no-repeat`,
          }}
        />
      </Input>
    </>
  );
};

export default PasswordInput;
