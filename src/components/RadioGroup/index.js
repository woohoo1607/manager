import React from "react";
import { Field } from "formik";

import "./styles.css";

const RadioGroup = ({ title, values, name, ...props }) => {
  const currentValue = props.currentValues
    ? props.currentValues[name]
    : values[0];
  return (
    <div className="input-container">
      <div className="input-title-container">
        <p className="input-title">{title}</p>
      </div>
      <div
        role="group"
        aria-labelledby="my-radio-group"
        className="radio-group"
      >
        {values &&
          values.map((value, i) => {
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
    </div>
  );
};

export default RadioGroup;
