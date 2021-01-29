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
  mask = "+7 (999) 999 99 99",
  children,
}) => (
  <InputContainer>
    <InputTitle title={title} />
    <FormikField name={name}>
      <InputWithMask type="tel" mask={mask} />
    </FormikField>
    {children}
  </InputContainer>
);

export default PhoneField;
