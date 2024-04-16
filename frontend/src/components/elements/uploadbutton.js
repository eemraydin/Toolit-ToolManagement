import { styled } from "@mui/material/styles";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
});

const UploadButton = (props) => {
  props.imageUrl && props.file && (
    <Box mt={2} textAlign="center">
      <img src={props.imageUrl} alt={props.file.name} height="100px" />
    </Box>
  );
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      sx={{
        display: "flex",
        textTransform: "none",
        backgroundColor: "#F4F4F4",
        border: "1px solid #E3E3E3",
        color: "#808080",
        height: "184px",
        alignItems:"center"
      }}
      align="center"
    >
      {!props.file && (
        <span>
          <FileUploadOutlinedIcon
            sx={{
              height: "2rem",
              width: "2rem",
            }}
          />
          <br />
          Click here to upload a photo
          <br />
          .jpg or .png
        </span>
      )}

      {props.imageUrl && props.file && (
        <img
          src={props.imageUrl}
          alt={props.file.name}
          height="174px"
          // width="100%"
        />
      )}
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => props.setFile(e.target.files[0])}
      />
    </Button>
  );
};

export default UploadButton;
