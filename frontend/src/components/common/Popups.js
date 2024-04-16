import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Popups({ onClose, popupMessage }) {
  return (
    <Dialog open={true} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "rgba(33, 99, 66, 0.9)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          alignItems: "center",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: "350px",
          height: "40px",
          padding: "1rem",
          zIndex: 9999,
          borderRadius: "6px",
        }}
      >
        <Typography variant="body1">{popupMessage.content}</Typography>
      </Box>
    </Dialog>
  );
}

export default Popups;
