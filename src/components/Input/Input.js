import React, { useState } from "react";
import PropTypes from "prop-types";

import Eye from "../../icons/eye.svg";
import EyeStrike from "../../icons/eye-strike.svg";
import Calendar from "../../icons/calendar.svg";
import "./styles.css";

const InputTypes = ["text", "password", "email", "date"];

const Input = ({ title, inputType = "text", isRequired = false }) => {
  const [type, setType] = useState(inputType);

  const changePasswordVisibility = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="input-container">
      <div className="input-title-container">
        <p className="input-title">{title}</p>
        {isRequired && <p className="input-title is-required">*</p>}
      </div>
      <input className="input" type={type} />
      {inputType === "password" && (
        <button
          className="input-img"
          onClick={changePasswordVisibility}
          style={
            type === "password"
              ? {
                  background: `url(${Eye}) center center no-repeat`,
                }
              : {
                  background: `url(${EyeStrike}) center center no-repeat`,
                }
          }
        />
      )}
      {inputType === "date" && (
        <button
          className="input-img"
          style={{
            background: `url(${Calendar}) center center no-repeat`,
          }}
        />
      )}
      <p className="input-error">error</p>
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.oneOf(InputTypes),
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
