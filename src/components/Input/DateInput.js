import React from "react";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../../icons/calendar.svg";
import "./styles.css";

const DateInput = ({ name, value, onBlur }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <DatePicker
        className="input"
        wrapperClassName="input-container"
        selected={(value && new Date(value)) || null}
        onChange={(val) => {
          setFieldValue(name, val);
        }}
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        onBlur={onBlur}
        name={name}
      />
      <button
        className="input-img"
        type="button"
        style={{
          background: `url(${CalendarIcon}) center center no-repeat`,
        }}
      />
    </>
  );
};

export default DateInput;
