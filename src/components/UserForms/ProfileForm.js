import React from "react";
import * as Yup from "yup";

import RadioGroup from "../RadioGroup";
import LayoutForm from "./LayoutForm";
import Input from "../UI/Input";
import DateInput from "../DateInput";
import InputTitle from "../UI/InputTitle";
import FormikField from "../FormikField";
import InputContainer from "../UI/InputContainer";

import "./styles.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  birthDate: Yup.string().required("birth date is required"),
  email: Yup.string()
    .required("email is required")
    .email("invalid email address"),
  address: Yup.string().required("address is required"),
  gender: Yup.string().required("gender is required"),
});

const ProfileFormBody = ({ errors, touched, currentValues, children }) => {
  return (
    <>
      <div style={{ width: "300px" }}>
        <InputContainer>
          <InputTitle title="First name" isRequired />
          <FormikField name="firstName">
            <Input />
          </FormikField>
        </InputContainer>
        <InputContainer>
          <InputTitle title="Last name" isRequired />
          <FormikField name="lastName">
            <Input />
          </FormikField>
        </InputContainer>
        <div style={{ width: "192px" }}>
          <InputContainer>
            <InputTitle title="Birth date" isRequired />
            <FormikField name="birthDate">
              <DateInput />
            </FormikField>
          </InputContainer>
        </div>
      </div>
      <div>
        <div style={{ width: "300px", marginBottom: "155px" }}>
          <InputContainer>
            <InputTitle title="Email" isRequired />
            <FormikField name="email">
              <Input />
            </FormikField>
          </InputContainer>
          <InputContainer>
            <InputTitle title="Address" isRequired />
            <FormikField name="address">
              <Input />
            </FormikField>
          </InputContainer>
          <RadioGroup
            title="Gender"
            variants={["Male", "Female"]}
            name="gender"
            errors={errors}
            touched={touched}
            currentValues={currentValues}
          />
        </div>
        {children}
      </div>
    </>
  );
};

const ProfileForm = ({
  nextStep,
  firstName,
  lastName,
  birthDate,
  email,
  address,
  gender,
  ...props
}) => {
  return (
    <LayoutForm
      {...props}
      component={ProfileFormBody}
      initialValues={{ firstName, lastName, birthDate, email, address, gender }}
      validationSchema={validationSchema}
      submit={nextStep}
    />
  );
};

export default ProfileForm;
