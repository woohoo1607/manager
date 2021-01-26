import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import RadioGroup from "../RadioGroup";
import LayoutForm from "./LayoutForm";

import "./styles.css";
import Input from "../Input";
import DateInput from "../DateInput";

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

const ProfileFormBody = ({ previousStep, ...props }) => {
  const inputStyle = {
    width: "300px",
  };
  const dateStyle = {
    width: "192px",
  };
  return (
    <>
      <div>
        <Input
          isRequired={true}
          name="firstName"
          type="text"
          title="First name"
          style={inputStyle}
        />
        <Input
          isRequired={true}
          name="lastName"
          type="text"
          title="Last name"
          style={inputStyle}
        />
        <DateInput
          isRequired={true}
          name="birthDate"
          type="date"
          title="Birth date"
          style={dateStyle}
        />
      </div>
      <div>
        <Input
          isRequired={true}
          name="email"
          type="email"
          title="Email"
          style={inputStyle}
        />
        <Input
          isRequired={true}
          name="address"
          type="text"
          title="Address"
          style={inputStyle}
        />
        <RadioGroup
          title="Gender"
          variants={["Male", "Female"]}
          name="gender"
          {...props}
        />
        <div className="profile-form__button-container">
          <Button
            color="gray"
            className="profile-form__button-back"
            onClick={previousStep}
          >
            Back
          </Button>
          <Button type="submit" className="profile-form__button">
            Forward
          </Button>
        </div>
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
  previousStep,
  ...props
}) => {
  return (
    <LayoutForm
      {...props}
      component={ProfileFormBody}
      previousStep={previousStep}
      initialValues={{ firstName, lastName, birthDate, email, address, gender }}
      validationSchema={validationSchema}
      submit={nextStep}
    />
  );
};

export default ProfileForm;