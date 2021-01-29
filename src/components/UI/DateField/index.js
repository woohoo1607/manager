import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import DateInput from "../../DateInput";
import InputContainer from "../InputContainer";

const DateField = ({ title = "", name = "", isRequired = true }) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <DateInput />
    </FormikField>
  </InputContainer>
);

export default DateField;
