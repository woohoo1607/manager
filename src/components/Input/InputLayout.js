import React from "react";
import { Field } from "formik";

const InputLayout = ({
  title,
  name,
  type = "text",
  isRequired,
  component,
  children,
  style,
}) => {
  const Component = component;
  return (
    <Field name={name}>
      {({ field, meta: { touched, error } }) => {
        const isError = touched && Boolean(error);
        return (
          <div className="input-container" style={style}>
            <div className="input-title-container">
              <p className="input-title">{title}</p>
              {isRequired && <p className="input-title is-required">*</p>}
            </div>
            <Component
              {...field}
              name={name}
              type={type}
              className={isError ? "input error" : "input"}
            />
            {children}
            {isError && <p className="input-error">{error}</p>}
          </div>
        );
      }}
    </Field>
  );
};

export default InputLayout;
