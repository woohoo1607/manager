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
        (isError && "#EB5757") || (state.isFocused && "#A1C4FF") || "#C1CFE0";
      return {
        ...provided,
        border: `1px solid ${borderColor}`,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
        minHeight: "40px",
        boxShadow: "none",
        margin: "5px 0 2px 0",
        "&:hover": { border: `1px solid ${borderColor}` },
      };
    },
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
      "& div": {
        width: "100%",
      },
      "& input": {
        fontWeight: "inherit",
      },
    }),
    multiValue: (base) => ({
      ...base,
      color: "#9BB0CB",
      backgroundColor: "#E7F0FF",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#9BB0CB",
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
      color: "#657C9A",
      paddingTop: 0,
      paddingBottom: 0,
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
      fontFamily: "Roboto",
      backgroundColor: isSelected ? "#E7F0FF" : isFocused ? "#E7F0FF" : null,
    }),
    clearIndicator: (base) => ({
      ...base,
      position: "absolute",
    }),
  };

  const getValue = () => {
    if (isMulti) {
      return options.filter((option) => value.indexOf(option.value) >= 0) || [];
    } else {
      return options.find((option) => option.value === value) || "";
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
