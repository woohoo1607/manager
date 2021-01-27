import React from "react";
import { Field } from "formik";

import "./styles.css";
import InputLayout from "../UI/InputLayout";
import InputTitle from "../UI/InputTitle";
import InputErrorMsg from "../UI/InputErrorMsg";

const InputField = ({ title, name, isRequired, type = "text", component }) => {
  const Component = component;
  return (
    <Field name={name}>
      {({ field, meta: { touched, error } }) => {
        const isError = touched && Boolean(error);
        return (
          <InputLayout>
            <InputTitle title={title} isRequired={isRequired} />
            <Component {...field} name={name} type={type} isError={isError} />
            {isError && <InputErrorMsg error={error} />}
          </InputLayout>
        );
      }}
    </Field>
  );
};

export default InputField;
