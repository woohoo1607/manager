import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import LayoutForm from "./LayoutForm";

import Input from "../UI/Input";
import PasswordInput from "../PasswordInput";

import "./styles.css";

const validationSchema = Yup.object({
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const AccountFormBody = () => {
  const inputStyle = {
    width: "400px",
  };
  return (
    <>
      <div>
        <div className="avatar-container"></div>
      </div>
      <div>
        <Input
          isRequired
          name="username"
          type="text"
          title="User name"
          style={inputStyle}
        />
        <PasswordInput
          isRequired
          name="password"
          title="Password"
          style={inputStyle}
        />
        <PasswordInput
          isRequired
          name="repeatPassword"
          type="password"
          title="Repeat Password"
          style={inputStyle}
        />
        <div className="account-form__button-container">
          <Button type="submit" className="form__button">
            Forward
          </Button>
        </div>
      </div>
    </>
  );
};

const AccountForm = ({ nextStep, username, password, avatar, ...props }) => {
  return (
    <LayoutForm
      {...props}
      component={AccountFormBody}
      initialValues={{ username, password, repeatPassword: password }}
      validationSchema={validationSchema}
      submit={nextStep}
    />
  );
};

export default AccountForm;
