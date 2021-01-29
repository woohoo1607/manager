import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import PasswordInput from "../../PasswordInput";
import InputContainer from "../InputContainer";

const PasswordField = ({ title, name, isRequired = true }) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <PasswordInput />
    </FormikField>
  </InputContainer>
);

export default PasswordField;
