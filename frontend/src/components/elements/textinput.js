import React from "react";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";

const TextInput = styled(Input)({
  "&&&:before": {
    borderBottom: "none",
  },
  "&&:after": {
    borderBottom: "none",
  },
  display: "block",
  background: "#f4f4f4",
  width: "100%",
  padding: "1rem",
  borderRadius: "6px",
  border: "1px solid #E3E3E3",
});

export default TextInput;
