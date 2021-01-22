import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";

import Button from "../Button";
import StepWizardBody from "./StepWizardBody";
import InputItem from "./InputItem";

const validationSchema = Yup.object({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  birthDate: Yup.string().required("birth date is required"),
  email: Yup.string()
    .required("email is required")
    .email("invalid email address"),
  address: Yup.string().required("address is required"),
});

const leftItems = [
  {
    name: "firstName",
    title: "First name",
    type: "text",
    className: "profile-form-input",
  },
  {
    name: "lastName",
    title: "Last name",
    type: "text",
    className: "profile-form-input",
  },
  {
    name: "birthDate",
    title: "Birth date",
    type: "date",
    className: "profile-form-date",
  },
];

const rightItems = [
  {
    name: "email",
    title: "Email",
    type: "email",
    className: "profile-form-input",
  },
  {
    name: "address",
    title: "Address",
    type: "text",
    className: "profile-form-input",
  },
];

const leftContent = () =>
  leftItems.map((item, i) => <InputItem {...item} key={i} />);

const rightContent = () => {
  return (
    <>
      {rightItems.map((item, i) => (
        <InputItem {...item} key={i} />
      ))}
      <div className="profile-form-btn">
        <Button title="Forward" btnView="primary" type="submit" />
      </div>
    </>
  );
};

const ProfileForm = ({
  addData,
  firstName,
  lastName,
  birthDate,
  email,
  address,
  ...props
}) => {
  return (
    <StepWizardBody
      {...props}
      leftContent={leftContent()}
      rightContent={rightContent()}
      initialValues={{ firstName, lastName, birthDate, email, address }}
      validationSchema={validationSchema}
      addData={addData}
    />
  );
};

export default ProfileForm;
