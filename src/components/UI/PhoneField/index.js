import InputContainer from "../InputContainer";
import InputTitle from "../InputTitle";
import FormikField from "../../FormikField";
import InputWithMask from "../../InputWithMask";

{
  /*TODO Fix warning ref*/
}
const PhoneField = ({
  title = "",
  name = "",
  mask = "+38 (999) 999 99 99",
  children,
  isSecondaryColor = false,
  isRequired = false,
}) => (
  <InputContainer>
    <InputTitle title={title} isRequired={isRequired} />
    <FormikField name={name}>
      <InputWithMask
        type="tel"
        mask={mask}
        isSecondaryColor={isSecondaryColor}
      />
    </FormikField>
    {children}
  </InputContainer>
);

export default PhoneField;
