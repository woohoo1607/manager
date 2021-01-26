import React, { useState } from "react";

import EyeIcon from "../../icons/eye.svg";
import EyeStrikeIcon from "../../icons/eye-strike.svg";
import Input from "../Input";

import "./styles.css";

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Input {...props} type={showPassword ? "text" : "password"}>
        <button
          className="input-img"
          onClick={toggleShowPassword}
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
