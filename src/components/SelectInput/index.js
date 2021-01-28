import React from "react";
import Select from "react-select";
import { useFormikContext } from "formik";

const SelectInput = ({ options, name, value, isError, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const customStyles = {
    control: (provided, state) => {
      let borderColor =
        (isError && "#EB5757") || (state.isFocused && "#A1C4FF") || "#C1CFE0";
      return {
        ...provided,
        border: `1px solid ${borderColor}`,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
        height: "40px",
        boxShadow: "none",
        "&:hover": { border: `1px solid ${borderColor}` },
      };
    },
    valueContainer: () => ({
      height: "40px",
      paddingLeft: "10px",
    }),
    input: () => ({
      marginTop: "9px",
    }),
    menuList: (base) => ({
      ...base,
      height: "172px",
      color: "#657C9A",
      "::-webkit-scrollbar": {
        width: "2px",
      },
      "::-webkit-scrollbar-track": {
        background: "none",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#C1CFE0",
        borderRadius: "29px",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      color: "#657C9A",
      backgroundColor: isSelected ? "#E7F0FF" : isFocused ? "#E7F0FF" : null,
    }),
  };

  return (
    <Select
      options={options}
      placeholder=""
      {...props}
      name={name}
      value={options ? options.find((option) => option.value === value) : ""}
      onChange={(option) => setFieldValue(name, option.value)}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
    />
  );
};

export default SelectInput;
