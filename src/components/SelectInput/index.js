import React from "react";
import Select, { components } from "react-select";
import { useFormikContext } from "formik";

import CloseIcon from "../../icons/Close.png";

const ClearIndicator = (props) => (
  <components.ClearIndicator {...props}>
    <img src={CloseIcon} alt="close-logo" />
  </components.ClearIndicator>
);

const SelectInput = ({
  options,
  name,
  value,
  isError,
  isMulti = false,
  menuListHeight = "172px",
  ...props
}) => {
  const { setFieldValue } = useFormikContext();

  const customStyles = {
    control: (provided, state) => {
      let borderColor =
        (isError && `var(--error-color)`) ||
        (state.isFocused && "#A1C4FF") ||
        "#C1CFE0";
      return {
        ...provided,
        border: `1px solid ${borderColor}`,
        borderRadius: 0,
        backgroundColor: "var(--application-background)",
        minHeight: "40px",
        boxShadow: "none",
        margin: "5px 0 2px 0",
        "&:hover": { border: `1px solid ${borderColor}` },
      };
    },
    singleValue: (base) => ({
      ...base,
      color: "inherit",
    }),
    valueContainer: (base) => ({
      ...base,
      minHeight: "40px",
      maxHeight: "40px",
      paddingLeft: "10px",
      overflowY: "scroll",
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    input: (base) => ({
      ...base,
      fontWeight: "bold",
      margin: 0,
      color: "inherit",
      "& div": {
        width: isMulti ? "inherit" : "100%",
      },
      "& input": {
        fontWeight: "inherit",
      },
    }),
    multiValue: (base) => ({
      ...base,
      color: "var(--secondary-text-color)",
      backgroundColor: "var(--secondary-bg-color)",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--secondary-text-color)",
      fontSize: "12px",
      fontFamily: "Roboto",
    }),
    menu: (base) => ({
      ...base,
      boxShadow: "none",
      marginTop: "15px",
    }),
    menuList: (base) => ({
      ...base,
      height: menuListHeight,
      color: "var(--secondary-text-color--darked)",
      paddingTop: 0,
      paddingBottom: 0,
      background: "var(--application-background)",
      "::-webkit-scrollbar": {
        width: "2px",
      },
      "::-webkit-scrollbar-track": {
        background: "none",
      },
      "::-webkit-scrollbar-thumb": {
        background: "var(--disabled-bg-color)",
        borderRadius: "29px",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      color: "var(--secondary-text-color--darked)",
      fontFamily: "Roboto",
      backgroundColor: isSelected
        ? "var(--secondary-bg-color)"
        : isFocused
        ? "var(--secondary-bg-color)"
        : null,
    }),
    clearIndicator: (base) => ({
      ...base,
      position: "absolute",
      cursor: "pointer",
    }),
  };

  const getValue = () => {
    if (isMulti) {
      return options.filter((option) => value.indexOf(option.value) >= 0);
    } else {
      return options.find((option) => option.value === value);
    }
  };

  return (
    <Select
      options={options}
      isMulti={isMulti}
      placeholder=""
      {...props}
      name={name}
      value={getValue()}
      onChange={(option) =>
        setFieldValue(
          name,
          isMulti ? option.map(({ value }) => value) : option.value
        )
      }
      components={{
        ClearIndicator,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
    />
  );
};

export default SelectInput;
