import React from "react";
import { Field } from "formik";

import InputErrorMsg from "../UI/InputErrorMsg";

import "./styles.css";

const FormikField = ({
  name,
  type = "text",
  children,
  invisibleError = false,
  ...props
}) => {
  return (
    <Field name={name} {...props}>
      {({ field, meta: { touched, error } }) => {
        const isError = touched && Boolean(error);
        return (
          <>
            {React.cloneElement(children, {
              name: name,
              isError: isError,
              ...field,
              ...props,
            })}
            {isError && !invisibleError && <InputErrorMsg error={error} />}
          </>
        );
      }}
    </Field>
  );
};

export default FormikField;
