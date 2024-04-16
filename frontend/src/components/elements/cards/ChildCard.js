import React from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { v4 as uuidv4 } from "uuid";

import { Typography } from "@mui/material";

const StyledCard = styled("div")`
  background: #f4f4f4;
  border-radius: 8px;
  margin: 1rem 0;
`;

const StyledP = styled("p")`
  margin: 0;
`;

const ChildCard = (props) => {
  return (
    <StyledCard className={props.className} style={props.style}>
      <CardContent>
        <Typography variant="h4" style={{ marginBottom: "0.5rem" }}>
          {props.title}
        </Typography>
        {props.contents &&
          props.contents.map((content) => (
            <StyledP key={`child_card_${uuidv4()}`}>{content}</StyledP>
          ))}
      </CardContent>
    </StyledCard>
  );
};

export default ChildCard;
