import Button from "@mui/material/Button";
import React from "react";

const style = {
  minHeight: "40px",
  maxHeight: "40px",
  justifyContent: "space-between",
  textTransform: "none",
  fontSize: "17px",
  borderBottom: "0.5px solid #808080",
  padding: "0 0 16px 0",
  borderRadius: 0,
  marginBottom: "16px",
  color: "black",
};

const roomItemBtnStyle = {
  minHeight: "40px",
  maxHeight: "40px",
  justifyContent: "space-between",
  textTransform: "none",
  fontSize: "1rem",
  borderBottom: "0.5px solid #808080",
  padding: "1.4rem 0.4rem",
  borderRadius: "0",
  color: "black",
};

const roomItemBtnOpenStyle = {
  minHeight: "40px",
  maxHeight: "40px",
  justifyContent: "space-between",
  textTransform: "none",
  fontSize: "1rem",
  borderBottom: "0.5px solid #808080",
  padding: "1.4rem 0.4rem",
  borderRadius: "0.6rem",
  color: "white",
  backgroundColor: "#342c62",
};

const FlexButton = (props) => {
  let targetStyle = style;
  if (props.className == "roomItemBtn") {
    targetStyle = props.isOpen ? roomItemBtnOpenStyle : roomItemBtnStyle;
  }

  return (
    <Button style={targetStyle} fullWidth={true} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default FlexButton;
