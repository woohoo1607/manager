import React from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";

import LayoutForm from "./LayoutForm";
import Input from "../UI/Input";
import InputTitle from "../UI/InputTitle";
import FormikField from "../FormikField";
import InputContainer from "../UI/InputContainer";
import InputWithMask from "../InputWithMask";
import SelectInput from "../SelectInput";
import Button from "../Button";
import { languages } from "./languagesList";

import "./styles.css";

const validationSchema = Yup.object({
  language: Yup.string().required("language is required"),
  fax: Yup.string().test(
    "len",
    "wrong fax format",
    (val) => val && val.length === 18
  ),
  phones: Yup.array(
    Yup.string().test(
      "len",
      "wrong phone format",
      (val) => val && val.length === 18
    )
  ),
});

const ContactsFormBody = ({ children, currentValues: { phones } }) => {
  const { setFieldValue } = useFormikContext();
  const addPhoneField = () => {
    setFieldValue("phones", [...phones, ""]);
  };

  const deletePhoneField = (i) => () => {
    const copyPhones = [...phones];
    copyPhones.splice(i, 1);
    setFieldValue("phones", copyPhones);
  };

  return (
    <>
      <div style={{ width: "300px" }}>
        <InputContainer>
          <InputTitle title="Company" />
          <FormikField name="company">
            <Input />
          </FormikField>
        </InputContainer>
        <InputContainer>
          <InputTitle title="Github link" />
          <FormikField name="github">
            <Input />
          </FormikField>
        </InputContainer>
        <InputContainer>
          <InputTitle title="Facebook link" />
          <FormikField name="facebook">
            <Input />
          </FormikField>
        </InputContainer>
        <InputContainer>
          <InputTitle title="Main Language" isRequired />
          <FormikField name="language">
            <SelectInput options={languages} />
          </FormikField>
        </InputContainer>
      </div>
      <div>
        <div
          style={{ width: "300px", minHeight: "330px", marginBottom: "115px" }}
        >
          {/*TODO Fix warning ref*/}
          <InputContainer>
            <InputTitle title="Fax" />
            <FormikField name="fax">
              <InputWithMask type="tel" mask="+7 (999) 999 99 99" />
            </FormikField>
          </InputContainer>
          {phones.map((phone, i) => (
            <InputContainer key={i}>
              <InputTitle title={`Phone #${i + 1}`} />
              <FormikField name={`phones[${i}]`}>
                <InputWithMask type="tel" mask="+7 (999) 999 99 99" />
              </FormikField>
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
            </InputContainer>
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
  nextStep,
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
      initialValues={{ company, github, facebook, language, fax, phones }}
      validationSchema={validationSchema}
      submit={nextStep}
    />
  );
};

export default ContactsForm;
