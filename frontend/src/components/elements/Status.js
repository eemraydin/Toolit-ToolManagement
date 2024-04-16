import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import theme from "../../theme";

const StatusCircle = styled("div")(({ theme, statusColor }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: statusColor,
  marginRight: 8,
}));

function getStatusColor(status) {
  switch (status) {
    case "Available":
      return theme.palette.accent.green;
    case "Low on stock":
      return theme.palette.accent.yellow;
    case "Out of Stock":
      return theme.palette.accent.red;
    default:
      return "black";
  }
}

const Status = (props) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <StatusCircle statusColor={getStatusColor(props.status)} />
      <Typography>{props.status}</Typography>
    </div>
  );
};

export default Status;
