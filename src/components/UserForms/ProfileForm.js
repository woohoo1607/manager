import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import InputField from "../UI/InputField";
import DateField from "../UI/DateField";
import RadioGroupField from "../UI/RadioGroupField";
import * as dayjs from "dayjs";

import "./styles.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  birthDate: Yup.string()
    .required("birth date is required")
    .test(
      "birthDate",
      "User must be over 18 years old",
      (value) => dayjs().diff(dayjs(value), "years") >= 18
    ),
  email: Yup.string()
    .required("email is required")
    .email("invalid email address"),
  address: Yup.string().required("address is required"),
  gender: Yup.string().required("gender is required"),
});

const ProfileFormBody = ({ errors, touched, currentValues, children }) => {
  return (
    <>
      <div>
        <InputField name="firstName" title="First name" isRequired />
        <InputField name="lastName" title="Last name" isRequired />

        <div style={{ width: "192px" }}>
          <DateField title="Birth date" name="birthDate" />
        </div>
      </div>
      <div className="with-controls">
        <div>
          <InputField name="email" title="Email" isRequired />
          <InputField name="address" title="Address" isRequired />
          <RadioGroupField
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
  submit,
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
      submit={submit}
    />
  );
};

export default ProfileForm;
