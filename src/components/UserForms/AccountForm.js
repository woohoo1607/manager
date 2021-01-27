import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import Input from "../UI/Input";
import PasswordInput from "../PasswordInput";
import FormikField from "../FormikField";
import InputTitle from "../UI/InputTitle";
import InputContainer from "../UI/InputContainer";

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
      <div>
        <div style={{ width: "400px", marginBottom: "125px" }}>
          <InputContainer>
            <InputTitle title="User name" isRequired />
            <FormikField name="username">
              <Input />
            </FormikField>
          </InputContainer>
          <InputContainer>
            <InputTitle title="Password" isRequired />
            <FormikField name="password">
              <PasswordInput />
            </FormikField>
          </InputContainer>
          <InputContainer>
            <InputTitle title="Repeat Password" isRequired />
            <FormikField name="repeatPassword">
              <PasswordInput />
            </FormikField>
          </InputContainer>
        </div>
        {children}
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
