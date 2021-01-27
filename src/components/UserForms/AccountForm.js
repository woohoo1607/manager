import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import LayoutForm from "./LayoutForm";
import Input from "../UI/Input";
import PasswordInput from "../PasswordInput";
import InputField from "../InputField";

import "./styles.css";

const validationSchema = Yup.object({
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const AccountFormBody = () => {
  return (
    <>
      <div>
        <div className="avatar-container"></div>
      </div>
      <div style={{ width: "400px" }}>
        <InputField
          isRequired
          name="username"
          title="User name"
          component={Input}
        />
        <InputField
          isRequired
          name="password"
          title="Password"
          component={PasswordInput}
        />
        <InputField
          isRequired
          name="repeatPassword"
          title="Repeat Password"
          component={PasswordInput}
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
