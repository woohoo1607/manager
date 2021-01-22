import React from "react";
import * as Yup from "yup";
import { Field } from "formik";
import PropTypes from "prop-types";

import Input from "../Input";
import Button from "../Button";
import StepWizardBody from "./StepWizardBody";

const validationSchema = Yup.object({
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const leftContent = () => {
  return <div className="avatar-container"></div>;
};

const rightContent = () => {
  return (
    <>
      <div className="account-form-input">
        <Field name="username">
          {({ field: { value, onChange, onBlur }, meta }) => (
            <Input
              name="username"
              isRequired={true}
              inputType="text"
              title="User name"
              isError={meta.touched && Boolean(meta.error)}
              errMsg={meta.error}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        </Field>
      </div>
      <div className="account-form-input">
        <Field name="password">
          {({ field: { value, onChange, onBlur }, meta }) => (
            <Input
              name="password"
              isRequired={true}
              inputType="password"
              title="Password"
              isError={meta.touched && Boolean(meta.error)}
              errMsg={meta.error}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        </Field>
      </div>
      <div className="account-form-input">
        <Field name="repeatPassword">
          {({ field: { value, onChange, onBlur }, meta }) => (
            <Input
              name="repeatPassword"
              isRequired={true}
              inputType="password"
              title="Repeat Password"
              isError={meta.touched && Boolean(meta.error)}
              errMsg={meta.error}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        </Field>
      </div>
      <div className="account-form-btn">
        <Button title="Forward" btnView="primary" type="submit" />
      </div>
    </>
  );
};

const AccountForm = ({ addData, username, password, avatar, ...props }) => {
  return (
    <StepWizardBody
      {...props}
      leftContent={leftContent()}
      rightContent={rightContent()}
      initialValues={{ username, password, repeatPassword: password }}
      validationSchema={validationSchema}
      addData={addData}
    />
  );
};

export default AccountForm;
