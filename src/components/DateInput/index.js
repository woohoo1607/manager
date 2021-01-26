import React from "react";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../../icons/calendar.svg";
import "./styles.css";
import InputLayout from "../Input/InputLayout";

const MyDatePicker = ({ name, value, onBlur }) => {
  const { setFieldValue } = useFormikContext();
  /*TODO Monday first day*/
  return (
    <DatePicker
      className="input"
      wrapperClassName="input-container"
      selected={(value && new Date(value)) || null}
      onChange={(val) => setFieldValue(name, val)}
      placeholderText="DD/MM/YYYY"
      dateFormat="dd/MM/yyyy"
      name={name}
      useWeekdaysShort={true}
      autoComplete="off"
      onBlur={onBlur}
    />
  );
};

const DateInput = ({ title, name, type, isRequired, style }) => {
  return (
    <>
      <InputLayout
        title={title}
        name={name}
        isRequired={isRequired}
        type={type}
        component={MyDatePicker}
        style={style}
      >
        <button
          className="input-img"
          type="button"
          style={{
            background: `url(${CalendarIcon}) center center no-repeat`,
          }}
        />
      </InputLayout>
    </>
  );
};

export default DateInput;
