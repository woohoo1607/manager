import React, { useState } from "react";
import PropTypes from "prop-types";

import EyeIcon from "../../icons/eye.svg";
import EyeStrikeIcon from "../../icons/eye-strike.svg";
import CalendarIcon from "../../icons/calendar.svg";
import "./styles.css";

const InputTypes = ["text", "password", "email", "date"];

const Input = ({
  title,
  name,
  inputType = "text",
  isRequired,
  field,
  form: { touched, errors },
}) => {
  const [type, setType] = useState(inputType);
  const isError = touched[field.name] && errors[field.name];
  const changePasswordVisibility = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <div className="input-container">
      <div className="input-title-container">
        <p className="input-title">{title}</p>
        {isRequired && <p className="input-title is-required">*</p>}
      </div>
      <input
        name={name}
        className={isError ? "input error" : "input"}
        type={type}
        {...field}
      />
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
      {inputType === "date" && (
        <button
          className="input-img"
          type="button"
          style={{
            background: `url(${CalendarIcon}) center center no-repeat`,
          }}
        />
      )}
      {isError && <p className="input-error">{errors[field.name]}</p>}
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.oneOf(InputTypes),
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
