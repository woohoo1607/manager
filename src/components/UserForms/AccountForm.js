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
    className: "account-form__input",
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    className: "account-form__input",
  },
  {
    name: "repeatPassword",
    title: "Repeat Password",
    type: "password",
    className: "account-form__input",
  },
];

const AccountFormBody = ({ ...props }) => {
  return (
    <>
      <div>
        <div className="avatar-container"></div>
      </div>
      <div>
        {rightItems.map((item, i) => (
          <InputItem {...item} key={i} {...props} />
        ))}
        <div className="account-form__button-container">
          <Button type="submit" className="account-form__button">
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
