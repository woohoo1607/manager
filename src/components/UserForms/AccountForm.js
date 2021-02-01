import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import InputField from "../UI/InputField";
import PasswordField from "../UI/PasswordField";
import FileInputField from "../UI/FileInputField";

import "./styles.css";

const MAX_PHOTO_SIZE = 1048576;

const validationSchema = Yup.object({
  avatar: Yup.mixed().test(
    "fileSize",
    "the file size must not exceed 1 MB",
    (value) => (value ? value.size <= MAX_PHOTO_SIZE : true)
  ),
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const AccountFormBody = ({ children, values: { avatar } }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="avatar-container">
          {avatar && (
            <img
              className="avatar"
              src={URL.createObjectURL(avatar)}
              alt="avatar"
            />
          )}
        </div>
        <FileInputField name="avatar" />
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
      initialValues={{ username, password, repeatPassword: password, avatar }}
      validationSchema={validationSchema}
      submit={submit}
    />
  );
};

export default AccountForm;
