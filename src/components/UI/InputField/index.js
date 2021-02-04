import InputContainer from "../InputContainer";
import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import Input from "../Input";

const InputField = ({
  title = "",
  name = "",
  isRequired = false,
  isSecondaryColor = false,
}) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <Input isSecondaryColor={isSecondaryColor} />
    </FormikField>
  </InputContainer>
);

export default InputField;
