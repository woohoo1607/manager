import React from "react";

import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import SelectInput from "../../SelectInput";
import InputContainer from "../InputContainer";

const SelectField = ({
  title = "",
  name = "",
  options = [],
  isMulti = false,
  menuListHeight = "172px",
  isRequired = true,
  ...props
}) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <SelectInput
        options={options}
        isMulti={isMulti}
        menuListHeight={menuListHeight}
        {...props}
      />
    </FormikField>
  </InputContainer>
);

export default SelectField;
