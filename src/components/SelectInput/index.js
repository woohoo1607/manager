import React from "react";
import Select from "react-select";
import { useFormikContext } from "formik";

const SelectInput = ({ options, name, value, ...props }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <Select
      options={options}
      {...props}
      name={name}
      value={options ? options.find((option) => option.value === value) : ""}
      onChange={(option) => setFieldValue(name, option.value)}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default SelectInput;
