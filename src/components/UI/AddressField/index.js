import React from "react";

import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import InputContainer from "../InputContainer";
import AddressInput from "../../AddressInput";

const AddressField = ({ title, name, isRequired = true }) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <AddressInput />
    </FormikField>
  </InputContainer>
);

export default AddressField;
