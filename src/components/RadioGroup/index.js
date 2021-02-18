import React from "react";

import RadioBtn from "../UI/RadioBtn";
import FormikField from "../FormikField";
import InputErrorMsg from "../UI/InputErrorMsg";

import "./styles.css";

const RadioGroup = ({ variants, name, errors, touched, currentValues }) => {
  const isError = touched[name] && Boolean(errors[name]);
  const errMsg = errors[name] || "Error";
  const currentValue = currentValues ? currentValues[name] : "";

  return (
    <>
      <div
        id={name}
        role="group"
        aria-labelledby="my-radio-group"
        className="radio-group"
      >
        {variants &&
          variants.map((value, i) => {
            return (
              <FormikField
                name={name}
                value={value}
                checked={currentValue === value}
                key={i}
                invisibleError
              >
                <RadioBtn />
              </FormikField>
            );
          })}
      </div>
      {isError && <InputErrorMsg error={errMsg} />}
    </>
  );
};

export default RadioGroup;
