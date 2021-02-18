import React from "react";
import { Field } from "formik";

import InputErrorMsg from "../UI/InputErrorMsg";

const FormikField = ({
  name,
  type = "text",
  children,
  invisibleError = false,
  ...props
}) => (
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

export default FormikField;
