import React from "react";
import { styled } from "@mui/material/styles";

import { CardContent } from "@mui/material";

const StyledCard = styled("div")`
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  position: relative;
`;

const CardElement = (props) => {
  return (
    <StyledCard className={props.className} style={props.style}>
      <CardContent>{props.children}</CardContent>
    </StyledCard>
  );
};

export default CardElement;
