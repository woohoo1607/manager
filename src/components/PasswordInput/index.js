import React, { useState } from "react";

import EyeIcon from "../../icons/eye.svg";
import EyeStrikeIcon from "../../icons/eye-strike.svg";
import Input from "../UI/Input";

import "./styles.css";
import Button from "../Button";

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Input {...props} type={showPassword ? "text" : "password"} />
      <Button
        className="input-img"
        onClick={toggleShowPassword}
        type="button"
        style={{
          background: `url(${
            showPassword ? EyeStrikeIcon : EyeIcon
          }) center center no-repeat`,
        }}
      />
    </>
  );
};

export default PasswordInput;
