import React from "react";

import InputContainer from "../InputContainer";
import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import Input from "../Input";

const InputField = ({
  title = "",
  name = "",
  placeholder = "",
  isRequired = false,
}) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <Input placeholder={placeholder} />
    </FormikField>
  </InputContainer>
);

export default InputField;
