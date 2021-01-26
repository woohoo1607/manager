import React from "react";
import { Field } from "formik";
import Input from "../Input";
import PasswordInput from "../PasswordInput/PasswordInput";
import DateInput from "../DateInput";

const InputItem = ({ name, title, type, className }) => {
  return (
    <div className={className}>
      <Field name={name}>
        {({ field, meta: { touched, error }, ...props }) => {
          switch (type) {
            case "password": {
              return (
                <PasswordInput
                  isRequired={true}
                  type={type}
                  title={title}
                  isError={touched && Boolean(error)}
                  errMsg={error}
                  {...field}
                  {...props}
                />
              );
            }
            case "date": {
              return (
                <DateInput
                  isRequired={true}
                  type={type}
                  title={title}
                  isError={touched && Boolean(error)}
                  errMsg={error}
                  {...field}
                />
              );
            }
            default:
              return (
                <Input
                  isRequired={true}
                  type={type}
                  title={title}
                  isError={touched && Boolean(error)}
                  errMsg={error}
                  {...field}
                  {...props}
                />
              );
          }
        }}
      </Field>
    </div>
  );
};

export default InputItem;
