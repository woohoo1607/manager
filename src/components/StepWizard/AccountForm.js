import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import StepWizardBody from "./StepWizardBody";
import InputItem from "./InputItem";

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
  return <div className="avatar-container"></div>;
};

const RightContent = () => {
  return (
    <>
      {rightItems.map((item, i) => (
        <InputItem {...item} key={i} />
      ))}
      <div className="account-form__button-container">
        <Button type="submit" className="account-form__button">
          Forward
        </Button>
      </div>
    </>
  );
};

const AccountForm = ({ nextStep, username, password, avatar, ...props }) => {
  return (
    <StepWizardBody
      {...props}
      leftContent={<LeftContent />}
      rightContent={<RightContent />}
      initialValues={{ username, password, repeatPassword: password }}
      validationSchema={validationSchema}
      submit={nextStep}
    />
  );
};

export default AccountForm;
