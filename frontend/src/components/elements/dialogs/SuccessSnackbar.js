import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessSnackbar = (props) => {
  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={props.onClose}
    >
      <Alert
        onClose={props.onClose}
        severity="success"
        variant="filled"
        sx={{ backgroundColor: "#216342", borderRadius: "10px" }}
      >
        {props.message ? props.message : "Success"}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
