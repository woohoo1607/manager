import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { useFormikContext } from "formik";
import Input from "../UI/Input";

import "./styles.css";

const AddressInput = ({ isError, name, value }) => {
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
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    key={i}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
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
