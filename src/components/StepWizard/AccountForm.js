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

const rightItems = [
  { name: "username", title: "User name", type: "text" },
  { name: "password", title: "Password", type: "password" },
  { name: "repeatPassword", title: "Repeat Password", type: "password" },
];

const Item = ({ name, title, type }) => {
  return (
    <div className="account-form-input">
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

const leftContent = () => {
  return <div className="avatar-container"></div>;
};

const rightContent = () => {
  return (
    <>
      {rightItems.map((item, i) => (
        <Item {...item} key={i} />
      ))}
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
