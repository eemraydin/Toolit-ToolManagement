import React from "react";

import Box from "@mui/material/Box";
import Button from "../buttons/Button";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  padding: "24px",
};

function CustomModal(props) {
  return (
    <div>
      {props.isEdit ? (
        <div onClick={props.handleOpen} style={{ display: "flex" }}>
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "1.4rem",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            edit_square
          </span>
        </div>
      ) : props.isEditItem ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <EditIcon
              onClick={props.handleOpen}
              sx={{ display: { xs: "block", md: "none" } }}
              xs={{ ml: "auto", cursor: "pointer", AlignItems: "center" }}
            />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button onClick={props.handleOpen}>{props.buttonName}</Button>
          </Box>
        </>
      ) : (
          
          <MuiButton variant="primary" onClick={props.handleOpen} sx={{fontSize:{md:"17px", xs:"14px"}}}>{props.buttonName}</MuiButton>
      )}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          maxWidth={props.style ?? { xs: 400, md: "512px" }}
          sx={props.style ?? style}
        >
          <Typography id="modal-modal-title" variant="h4">
            {props.title}
          </Typography>
          {props.subtitle && (<Typography id="modal-modal-description" variant="h6" sx={{marginTop: "16px"}}>
            {props.subtitle}
          </Typography>)}
          <div>{props.description}</div>
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
