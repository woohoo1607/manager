import InputTitle from "../InputTitle";
import RadioGroup from "../../RadioGroup";
import InputContainer from "../InputContainer";

const RadioGroupField = ({
  title = "",
  variants = [],
  name = "",
  errors = {},
  touched = {},
  currentValues = {},
}) => (
  <InputContainer>
    <InputTitle title={title} />
    <RadioGroup
      variants={variants}
      name={name}
      errors={errors}
      touched={touched}
      currentValues={currentValues}
    />
  </InputContainer>
);

export default RadioGroupField;
