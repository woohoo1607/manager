import React from "react";
import * as Yup from "yup";

import Button from "../Button";
import StepWizardBody from "./StepWizardBody";
import InputItem from "./InputItem";
import RadioGroup from "../RadioGroup";

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

const LeftContent = () =>
  leftItems.map((item, i) => <InputItem {...item} key={i} />);

const RightContent = (props) => {
  return (
    <>
      {rightItems.map((item, i) => (
        <InputItem {...item} key={i} />
      ))}
      <RadioGroup
        title="Gender"
        values={["Male", "Female"]}
        name="gender"
        {...props}
      />
      <div className="profile-form-btn">
        <Button title="Back" btnView="disable" type="submit" />
        <Button title="Forward" type="submit" />
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
  gender,
  ...props
}) => {
  return (
    <StepWizardBody
      {...props}
      leftContent={<LeftContent />}
      rightContent={<RightContent />}
      initialValues={{ firstName, lastName, birthDate, email, address, gender }}
      validationSchema={validationSchema}
      addData={addData}
    />
  );
};

export default ProfileForm;
