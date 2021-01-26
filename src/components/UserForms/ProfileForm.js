import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import InputItem from "./InputItem";
import RadioGroup from "../RadioGroup";
import LayoutForm from "./LayoutForm";

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

const leftItems = [
  {
    name: "firstName",
    title: "First name",
    type: "text",
    className: "profile-form__input",
  },
  {
    name: "lastName",
    title: "Last name",
    type: "text",
    className: "profile-form__input",
  },
  {
    name: "birthDate",
    title: "Birth date",
    type: "date",
    className: "profile-form__input profile-form__input-date",
  },
];

const rightItems = [
  {
    name: "email",
    title: "Email",
    type: "email",
    className: "profile-form__input",
  },
  {
    name: "address",
    title: "Address",
    type: "text",
    className: "profile-form__input",
  },
];

const ProfileFormBody = ({ previousStep, ...props }) => {
  return (
    <>
      <div>
        {leftItems.map((item, i) => (
          <InputItem {...item} key={i} />
        ))}
      </div>
      <div>
        {rightItems.map((item, i) => (
          <InputItem {...item} key={i} {...props} />
        ))}
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
