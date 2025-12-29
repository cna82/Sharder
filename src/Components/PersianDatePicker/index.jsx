//imports
import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
//Persian date picker comp
const PersianDatePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
      inputClass="custom-date-input"
      style={{
        width: "100%",
        height: "40px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        padding: "0 10px",
        direction: "rtl",
        textAlign: "right",
        backgroundColor: "white",
        color: "black"
      }}
      format="YYYY/MM/DD"
      calendarPosition="bottom-right"
      portal
      editable={false}
    />
  );
}

export default PersianDatePicker;