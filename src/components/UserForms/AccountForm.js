import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import InputField from "../UI/InputField";
import PasswordField from "../UI/PasswordField";

import "./styles.css";

const validationSchema = Yup.object({
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const AccountFormBody = ({ children }) => {
  return (
    <>
      <div>
        <div className="avatar-container"></div>
      </div>
      <div className="with-controls" style={{ width: "400px" }}>
        <div>
          <InputField name="username" title="User name" isRequired />
          <PasswordField title="Password" name="password" />
          <PasswordField title="Repeat Password" name="repeatPassword" />
        </div>
        {children}
      </div>
    </>
  );
};

const AccountForm = ({ submit, username, password, avatar, ...props }) => {
  return (
    <LayoutForm
      {...props}
      component={AccountFormBody}
      initialValues={{ username, password, repeatPassword: password }}
      validationSchema={validationSchema}
      submit={submit}
    />
  );
};

export default AccountForm;
