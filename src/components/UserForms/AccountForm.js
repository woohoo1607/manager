import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import InputField from "../UI/InputField";
import PasswordField from "../UI/PasswordField";
import FileInputField from "../UI/FileInputField";
import Avatar from "../UI/Avatar";

import "./styles.css";

const MAX_PHOTO_SIZE = 1048576;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
  avatar: Yup.mixed()
    .test("fileSize", "the file size must not exceed 1 MB", (value) =>
      value ? value.size <= MAX_PHOTO_SIZE : true
    )
    .test("fileFormat", "Unsupported Format", (value) =>
      value ? SUPPORTED_FORMATS.includes(value.type) : true
    ),
  username: Yup.string().required("User name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const AccountFormBody = ({ children, values: { avatar } }) => {
  return (
    <>
      <div style={{ textAlign: "center", width: "200px" }}>
        <Avatar avatar={avatar} style={{ width: "171px", height: "171px" }} />
        <FileInputField name="avatar" avatar={avatar} />
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

const AccountForm = ({
  submit = () => {},
  username = "",
  password = "",
  avatar = null,
  ...props
}) => {
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
