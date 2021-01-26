import React from "react";
import { Field } from "formik";

import "./styles.css";

const RadioGroup = ({
  title,
  variants,
  name,
  errors,
  touched,
  currentValues,
}) => {
  const isError = touched[name] && Boolean(errors[name]);
  const errMsg = errors[name] || "Error";
  const currentValue = currentValues ? currentValues[name] : "";
  return (
    <div className="input-container">
      <div className="input-title-container">
        <p className="input-title">{title}</p>
      </div>
      <div
        id={name}
        role="group"
        aria-labelledby="my-radio-group"
        className="radio-group"
      >
        {variants &&
          variants.map((value, i) => {
            return (
              <label
                key={i}
                className={
                  currentValue === value ? "radio-label checked" : "radio-label"
                }
              >
                <Field type="radio" name={name} value={value} />
                {value}
              </label>
            );
          })}
      </div>
      {isError && <p className="input-error">{errMsg}</p>}
    </div>
  );
};

export default RadioGroup;
