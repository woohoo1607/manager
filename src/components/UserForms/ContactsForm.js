import React from "react";
import * as Yup from "yup";

import LayoutForm from "./LayoutForm";
import Input from "../UI/Input";
import InputTitle from "../UI/InputTitle";
import FormikField from "../FormikField";
import InputContainer from "../UI/InputContainer";
import InputWithMask from "../InputWithMask";
import SelectInput from "../SelectInput";

import "./styles.css";

const validationSchema = Yup.object({
  language: Yup.string().required("language is required"),
});

const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  },
  {
    value: "es",
    label: "Spanish",
  },
  {
    value: "ar",
    label: "Arabic",
  },
  {
    value: "cmn",
    label: "Mandarin",
  },
  {
    value: "ru",
    label: "Russian",
  },
  {
    value: "pt",
    label: "Portuguese",
  },
  {
    value: "de",
    label: "German",
  },
  {
    value: "ja",
    label: "Japanese",
  },
  {
    value: "hi",
    label: "Hindi",
  },
  {
    value: "ms",
    label: "Malay",
  },
  {
    value: "fa",
    label: "Persian",
  },
  {
    value: "sw",
    label: "Swahili",
  },
  {
    value: "ta",
    label: "Tamil",
  },
  {
    value: "it",
    label: "Italian",
  },
  {
    value: "nl",
    label: "Dutch",
  },
  {
    value: "bn",
    label: "Bengali",
  },
  {
    value: "tr",
    label: "Turkish",
  },
  {
    value: "vi",
    label: "Vietnamese",
  },
  {
    value: "pl",
    label: "Polish",
  },
  {
    value: "jv",
    label: "Javanese",
  },
  {
    value: "pa",
    label: "Punjabi",
  },
  {
    value: "th",
    label: "Thai",
  },
  {
    value: "ko",
    label: "Korean",
  },
];

const ContactsFormBody = ({ children }) => {
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
        <div style={{ width: "300px", marginBottom: "155px" }}>
          {/*TODO Fix warning ref*/}
          <InputContainer>
            <InputTitle title="Fax" />
            <FormikField name="fax">
              <InputWithMask type="tel" mask="+7 (999) 999 99 99" />
            </FormikField>
          </InputContainer>
          <InputContainer>
            <InputTitle title="Phone" />
            <FormikField name="phone">
              <Input />
            </FormikField>
          </InputContainer>
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
