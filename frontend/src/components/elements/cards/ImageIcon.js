import React from "react";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledImage = styled("img")`
  border-radius: 50%;
  object-fit: cover;
  margin: 1rem 1rem 1rem 0;
`;

const ImageIcon = (props) => {
  return (
    <>
      {props.isDefault ? (
        <AccountCircleIcon
          style={{
            color: "#D9D9D9",
            height: props.size,
            width: props.size,
            margin: "1rem 1rem 1rem 0",
          }}
        ></AccountCircleIcon>
      ) : (
        <StyledImage
          src={props.src}
          alt={props.alt}
          className={props.className}
          style={{
            height: props.size,
            width: props.size,
            margin: props.margin,
          }}
        />
      )}
    </>
  );
};

export default ImageIcon;
