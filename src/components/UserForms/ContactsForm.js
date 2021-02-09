import React from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";

import LayoutForm from "./LayoutForm";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import SelectField from "../UI/SelectField";
import PhoneField from "../UI/PhoneField";
import { LANGUAGES } from "./languagesList";
import IconButton from "../UI/IconButton";

import "./styles.css";

const URL_PATTERN = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const validationSchema = Yup.object({
  language: Yup.string().required("language is required"),
  github: Yup.string()
    .required("github link is required")
    .matches(URL_PATTERN, "enter correct url"),
  facebook: Yup.string()
    .required("facebook link is required")
    .matches(URL_PATTERN, "enter correct url"),
  fax: Yup.string().min(19, "wrong fax format").required("fax is required"),
  phones: Yup.array().of(
    Yup.lazy(() => Yup.string().min(19, "wrong phone format"))
  ),
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
        <InputField name="github" title="Github link" isRequired />
        <InputField
          name="facebook"
          title="Facebook link"
          isRequired
          placeholder="www.facebook.com/hdfk_142_23lelf/"
        />
        <SelectField
          title="Main Language"
          name="language"
          options={LANGUAGES}
        />
      </div>
      <div className="with-controls">
        <div>
          <PhoneField title="Fax" name="fax" isRequired />
          {phones.map((phone, i) => (
            <PhoneField
              key={i}
              title={`Phone #${i + 1}`}
              name={`phones[${i}]`}
              placeholder={i ? `` : `+38 (066) 888 88 88`}
            >
              {phones.length > 1 && (
                <IconButton
                  onClick={deletePhoneField(i)}
                  className="phones-controls-icon"
                  type="button"
                  icon="minus"
                />
              )}
            </PhoneField>
          ))}
          {phones.length < 3 && (
            <Button
              onClick={addPhoneField}
              type="button"
              className="phones-controls-btn"
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
