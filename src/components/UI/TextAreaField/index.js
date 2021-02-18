import React from "react";

import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import TextArea from "../TextArea";
import InputContainer from "../InputContainer";

const TextAreaField = ({
  title = "",
  name = "",
  maxLength = "300",
  containerStyle = {},
}) => (
  <InputContainer style={containerStyle}>
    <InputTitle title={title} />
    <FormikField name={name}>
      <TextArea maxLength={maxLength} />
    </FormikField>
  </InputContainer>
);

export default TextAreaField;
