import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import SelectField from "../UI/SelectField";
import TextAreaField from "../UI/TextAreaField";
import CheckboxGroupField from "../UI/CheckboxGroupField";
import { SKILLS } from "./skillsList";

import "./styles.css";

const hobbies = [
  "Art",
  "Sport, fitness, aerobica and staff like that",
  "I just want to play games, I’m not living in this life",
  "I’m a female... I’m doing nothing. Every day.",
  "Guitar, guitar and guitar again. I’m fall in love with it.",
  "WTF is “hobbies”???",
];

const validationSchema = Yup.object({
  information: Yup.string().max(300, "maximum 300 characters"),
  skills: Yup.array().min(3, "you must select at least 3 skills"),
});

const CapabilitiesFormBody = ({ children, currentValues }) => {
  return (
    <>
      <div style={{ width: "300px" }}>
        <SelectField
          title="Skills"
          name="skills"
          options={SKILLS}
          isMulti
          menuListHeight="132px"
          menuIsOpen
        />
        <TextAreaField
          title="Additional information"
          name="information"
          containerStyle={{ marginTop: "145px" }}
        />
      </div>
      <div className="with-controls">
        <div>
          <CheckboxGroupField
            title="My hobbies"
            variants={hobbies}
            name="hobbies"
            currentValues={currentValues}
          />
        </div>
        {children}
      </div>
    </>
  );
};

const CapabilitiesForm = ({
  submit,
  skills,
  information,
  hobbies,
  ...props
}) => {
  return (
    <LayoutForm
      {...props}
      component={CapabilitiesFormBody}
      initialValues={{ skills, information, hobbies }}
      validationSchema={validationSchema}
      submit={submit}
    />
  );
};

export default CapabilitiesForm;
