import React from "react";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../../../icons/calendar.svg";
import "./styles.css";

const DateInput = ({ name, value, ...props }) => {
  const { setFieldValue } = useFormikContext();
  console.log(value);
  /*TODO Monday first day*/
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
        name={name}
        useWeekdaysShort={true}
        autoComplete="off"
        {...props}
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
