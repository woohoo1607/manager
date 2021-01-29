import React from "react";

import FormikField from "../FormikField";
import Checkbox from "../UI/Checkbox";

const CheckboxGroup = ({ variants = [], name, currentValues }) => {
  const activeCheckboxes = currentValues ? currentValues[name] : [];

  return (
    <>
      <div
        id={name}
        role="group"
        aria-labelledby="my-radio-group"
        className="checkbox-group"
      >
        {variants.map((value, i) => {
          return (
            <FormikField
              name={name}
              value={value}
              checked={activeCheckboxes.includes(value)}
              key={i}
              invisibleError
            >
              <Checkbox />
            </FormikField>
          );
        })}
      </div>
    </>
  );
};

export default CheckboxGroup;
