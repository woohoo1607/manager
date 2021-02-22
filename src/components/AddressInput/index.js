import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { useFormikContext } from "formik";

import Input from "../UI/Input";

import "./styles.css";

const BLOCK_CLASS_NAME = "autocomplete-dropdown-container";

const AddressInput = ({ isError = false, name = "", value = "" }) => {
  const { setFieldValue } = useFormikContext();

  const handleSelect = (address) => {
    setFieldValue(name, address);
  };

  return (
    <PlacesAutocomplete
      value={value}
      onChange={(option) => {
        setFieldValue(name, option);
      }}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Input {...getInputProps({ placeholder: "" })} isError={isError} />
          {suggestions && (
            <div className={BLOCK_CLASS_NAME}>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const { active: isActive, description, placeId } = suggestion;
                return (
                  <div
                    key={placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className: `${BLOCK_CLASS_NAME}__item ${
                        isActive ? `${BLOCK_CLASS_NAME}__item-active` : ""
                      }`,
                    })}
                  >
                    <span>{description}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressInput;
