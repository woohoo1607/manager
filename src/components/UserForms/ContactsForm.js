import React from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";

import LayoutForm from "./LayoutForm";
import Button from "../Button";
import InputField from "../UI/InputField";
import SelectField from "../UI/SelectField";
import PhoneField from "../UI/PhoneField";
import { LANGUAGES } from "./languagesList";

import "./styles.css";

const validationSchema = Yup.object({
  language: Yup.string().required("language is required"),
  fax: Yup.string().test(
    "len",
    "wrong fax format",
    (val) => val && val.length === 18
  ),
  phones: Yup.array(Yup.string().min(18, "wrong phone format")),
});

const ContactsFormBody = ({ children, currentValues: { phones } }) => {
  const { setFieldValue } = useFormikContext();

  const addPhoneField = () => setFieldValue("phones", [...phones, ""]);

  const deletePhoneField = (i) => () => {
    const copyPhones = [...phones];
    copyPhones.splice(i, 1);
    setFieldValue("phones", copyPhones);
  };

  return (
    <>
      <div style={{ width: "300px" }}>
        <InputField name="company" title="Company" />
        <InputField name="github" title="Github link" />
        <InputField name="facebook" title="Facebook link" />
        <SelectField
          title="Main Language"
          name="language"
          options={LANGUAGES}
        />
      </div>
      <div className="with-controls">
        <div>
          <PhoneField title="Fax" name="fax" />
          {phones.map((phone, i) => (
            <PhoneField key={i} title={`Phone #${i + 1}`} name={`phones[${i}]`}>
              {phones.length > 1 && (
                <Button
                  onClick={deletePhoneField(i)}
                  style={{
                    border: "none",
                    minWidth: "9px",
                    height: "2px",
                    backgroundColor: "#CED9E5",
                    padding: 0,
                    position: "absolute",
                    top: "50%",
                    right: "-20px",
                    cursor: "pointer",
                  }}
                  type="button"
                />
              )}
            </PhoneField>
          ))}
          {phones.length < 3 && (
            <Button
              onClick={addPhoneField}
              type="button"
              style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
                color: "#657C9A",
              }}
            >
              + add phone number
            </Button>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

const ContactsForm = ({
  submit,
  company,
  github,
  facebook,
  language,
  fax,
  phones,
  ...props
}) => {
  return (
    <LayoutForm
      {...props}
      component={ContactsFormBody}
      initialValues={{
        company,
        github,
        facebook,
        language,
        fax,
        phones: phones.length ? phones : [""],
      }}
      validationSchema={validationSchema}
      submit={submit}
    />
  );
};

export default ContactsForm;
