import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import InputItem from "./InputItem";
import LayoutForm from "./LayoutForm";

import "./styles.css";

const validationSchema = Yup.object({
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const rightItems = [
  {
    name: "username",
    title: "User name",
    type: "text",
    className: "account-form-input",
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    className: "account-form-input",
  },
  {
    name: "repeatPassword",
    title: "Repeat Password",
    type: "password",
    className: "account-form-input",
  },
];

const LeftContent = () => {
  return (
    <div>
      <div className="avatar-container"></div>
    </div>
  );
};

const RightContent = () => {
  return (
    <div>
      {rightItems.map((item, i) => (
        <InputItem {...item} key={i} />
      ))}
      <div className="account-form__button-container">
        <Button type="submit" className="account-form__button">
          Forward
        </Button>
      </div>
    </div>
  );
};

const AccountFormBody = (props) => {
  return (
    <>
      <LeftContent {...props} />
      <RightContent {...props} />
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
      className="user-form account-form"
    />
  );
};

export default AccountForm;
