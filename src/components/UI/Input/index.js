import React from "react";

import InputLayout from "./InputLayout";

import "./styles.css";

const BaseInput = ({ ...props }) => {
  return <input {...props} />;
};

const Input = ({ title, type, name, isRequired, children, style }) => {
  return (
    <InputLayout
      title={title}
      isRequired={isRequired}
      type={type}
      name={name}
      component={BaseInput}
      children={children}
      style={style}
    />
  );
};

export default Input;
