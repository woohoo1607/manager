import React from "react";
import { Field } from "formik";
import Input from "../Input";

const InputItem = ({ name, title, type, className }) => {
  return (
    <div className={className}>
      <Field name={name}>
        {({ field: { value, onChange, onBlur }, meta }) => (
          <Input
            name={name}
            isRequired={true}
            inputType={type}
            title={title}
            isError={meta.touched && Boolean(meta.error)}
            errMsg={meta.error}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      </Field>
    </div>
  );
};

export default InputItem;
