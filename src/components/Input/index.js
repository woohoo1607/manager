import React, { useState } from "react";
import PropTypes from "prop-types";

import EyeIcon from "../../icons/eye.svg";
import EyeStrikeIcon from "../../icons/eye-strike.svg";
import DateInput from "./DateInput";

import "./styles.css";

const InputTypes = ["text", "password", "email", "date"];

const Input = ({
  title,
  name,
  inputType = "text",
  isRequired,
  isError,
  errMsg,
  value,
  onChange,
  onBlur,
}) => {
  const [type, setType] = useState(inputType);
  const changePasswordVisibility = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <div className="input-container">
      <div className="input-title-container">
        <p className="input-title">{title}</p>
        {isRequired && <p className="input-title is-required">*</p>}
      </div>
      {inputType === "date" ? (
        <DateInput
          onBlur={onBlur}
          name={name}
          value={value}
          className={isError ? "input error" : "input"}
        />
      ) : (
        <input
          name={name}
          className={isError ? "input error" : "input"}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {inputType === "password" && (
        <button
          className="input-img"
          onClick={changePasswordVisibility}
          type="button"
          style={{
            background: `url(${
              type === "password" ? EyeIcon : EyeStrikeIcon
            }) center center no-repeat`,
          }}
        />
      )}

      {isError && <p className="input-error">{errMsg}</p>}
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.oneOf(InputTypes),
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
