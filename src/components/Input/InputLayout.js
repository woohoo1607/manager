import React from "react";

const InputLayout = ({
  title,
  name,
  type = "text",
  isRequired,
  isError,
  errMsg,
  onBlur,
  component,
  children,
  ...props
}) => {
  const Component = component;
  return (
    <div className="input-container">
      <div className="input-title-container">
        <p className="input-title">{title}</p>
        {isRequired && <p className="input-title is-required">*</p>}
      </div>
      <Component
        {...props}
        name={name}
        type={type}
        onBlur={onBlur}
        className={isError ? "input error" : "input"}
      />
      {children}
      {isError && <p className="input-error">{errMsg}</p>}
    </div>
  );
};

export default InputLayout;
