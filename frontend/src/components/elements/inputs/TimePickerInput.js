import React from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TimePickerInput = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        {...props}
        sx={{ background: "#f4f4f4", width: "100%" }}
        slotProps={{
          textField: {
            placeholder: "00:00",
            helperText: props.error,
          },
        }}
      ></MobileTimePicker>
    </LocalizationProvider>
  );
};

export default TimePickerInput;
