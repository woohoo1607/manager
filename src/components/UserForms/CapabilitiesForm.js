import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import InputTitle from "../UI/InputTitle";
import FormikField from "../FormikField";
import InputContainer from "../UI/InputContainer";
import SelectInput from "../SelectInput";
import { skills } from "./skillsList";
import TextArea from "../UI/TextArea";
import CheckboxGroup from "../CheckboxGroup";

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
        <InputContainer>
          <InputTitle title="Skills" isRequired />
          <FormikField name="skills">
            <SelectInput
              options={skills}
              isMulti
              menuListHeight="132px"
              menuIsOpen
              currentValues={currentValues}
            />
          </FormikField>
        </InputContainer>
        <InputContainer style={{ marginTop: "145px" }}>
          <InputTitle title="Additional information" />
          <FormikField name="information">
            <TextArea maxLength="300" />
          </FormikField>
        </InputContainer>
      </div>
      <div>
        <div
          style={{ width: "330px", minHeight: "330px", marginBottom: "115px" }}
        >
          <InputContainer>
            <InputTitle title="My hobbies" />
            <CheckboxGroup
              variants={hobbies}
              name="hobbies"
              currentValues={currentValues}
            />
          </InputContainer>
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
