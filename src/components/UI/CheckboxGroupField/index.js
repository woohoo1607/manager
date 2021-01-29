import InputTitle from "../InputTitle";
import CheckboxGroup from "../../CheckboxGroup";
import InputContainer from "../InputContainer";

const CheckboxGroupField = ({
  title = "",
  name = "",
  variants = [],
  currentValues = [],
}) => (
  <InputContainer>
    <InputTitle title={title} />
    <CheckboxGroup
      variants={variants}
      name={name}
      currentValues={currentValues}
    />
  </InputContainer>
);

export default CheckboxGroupField;
