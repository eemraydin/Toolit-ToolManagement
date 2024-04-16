import React from "react";
import { styled } from "@mui/material/styles";

const StyledWideImage = styled("img")`
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
`;

const StyledSmallImage = styled(StyledWideImage)`
  max-height: 200px;
`;

const StyledBorderedImage = styled(StyledWideImage)`
  border: 1px solid black;
  margin: 0
`;

const ImageCard = (props) => {
  if (props.wide) {
    return (
      <div>
        <StyledWideImage
          src={props.src}
          alt={props.alt}
          className={props.className}
          style={props.style}
        />
      </div>
    );
  }

  if (props.border) {
    return (
        <StyledBorderedImage
          src={props.src}
          alt={props.alt}
          className={props.className}
          style={props.style}
        />
    );
  }

  return (
    <div>
      <StyledSmallImage
        src={props.src}
        alt={props.alt}
        className={props.className}
        style={props.style}
      />
    </div>
  );
};

export default ImageCard;
