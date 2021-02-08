import React from "react";
import { useFormikContext } from "formik";
import InputMask from "react-input-mask";
import Input from "../UI/Input";

const InputWithMask = ({ name, isSecondaryColor, ...props }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <InputMask
      {...props}
      onChange={(e) => setFieldValue(name, e.target.value)}
      name={name}
      maskChar=""
    >
      {(inputProps) => (
        <Input {...inputProps} isSecondaryColor={isSecondaryColor} />
      )}
    </InputMask>
  );
};

export default InputWithMask;
