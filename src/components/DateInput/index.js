import React from "react";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../../icons/calendar.svg";

import Button from "../UI/Button";

import "./styles.css";

const DateInput = ({ name, value, onBlur, isError }) => {
  /*TODO Monday first day*/
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <DatePicker
        className={isError ? "input error" : "input"}
        wrapperClassName="input-container"
        selected={(value && new Date(value)) || null}
        onChange={(val) => setFieldValue(name, val)}
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        name={name}
        useWeekdaysShort
        autoComplete="off"
        onBlur={onBlur}
      />
      <Button
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
