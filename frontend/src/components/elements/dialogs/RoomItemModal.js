import React, { useState } from "react";

import Box from "@mui/material/Box";
import { Typography, Modal } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowDown } from "@mui/icons-material";

import Button from "../buttons/Button";
import FlexButton from "../buttons/FlexButton";
import BasicTable from "../tables/BasicTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function RoomItemModal(props) {
  const roomitem = props.roomitem;
  const itemName = roomitem.item.name;
  const itemId = roomitem.item._id;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createTableRow = (name, value) => {
    return { name, value };
  };

  const createTableRows = (roomitem) => {
    let result = [];
    result.push(createTableRow("Quantity", roomitem.quantity));
    return result;
  };

  return (
    <div>
      <FlexButton className="roomItemBtn" isOpen={open} onClick={handleOpen}>
        {itemName}
        {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
      </FlexButton>
      <Modal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {itemName}
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <BasicTable rows={createTableRows(roomitem)} />
            <h4>Description</h4>
            <p>{roomitem.item.description}</p>
            <Button to={`/items/${itemId}`} size="wide">
              See Item Details
            </Button>
            <Button gray onClick={handleClose}>
              Back
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default RoomItemModal;
