import React from "react";

import InputLayout from "./InputLayout";

import "./styles.css";

const BaseInput = ({ ...props }) => {
  return <input {...props} />;
};

const Input = ({
  title,
  name,
  type,
  isRequired,
  isError,
  errMsg,
  ...props
}) => {
  return (
    <InputLayout
      title={title}
      name={name}
      isRequired={isRequired}
      isError={isError}
      errMsg={errMsg}
      type={type}
      {...props}
      component={BaseInput}
    />
  );
};

export default Input;
