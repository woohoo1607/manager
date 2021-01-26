import React from "react";
import { Field } from "formik";
import Input from "../Input";

const InputItem = ({ name, title, type, className }) => {
  return (
    <div className={className}>
      <Field name={name}>
        {({ field, meta: { touched, error } }) => (
          <Input
            isRequired={true}
            inputType={type}
            title={title}
            isError={touched && Boolean(error)}
            errMsg={error}
            {...field}
          />
        )}
      </Field>
    </div>
  );
};

export default InputItem;
