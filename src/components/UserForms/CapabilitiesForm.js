import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import SelectField from "../UI/SelectField";
import TextAreaField from "../UI/TextAreaField";
import CheckboxGroupField from "../UI/CheckboxGroupField";
import { HOBBIES, SKILLS } from "../../mocks";

import "./styles.css";

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
            variants={HOBBIES}
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
