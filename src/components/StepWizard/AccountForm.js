import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";

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

const leftContent = () => {
  return <div className="avatar-container"></div>;
};

const rightContent = () => {
  return (
    <>
      {rightItems.map((item, i) => (
        <InputItem {...item} key={i} />
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
