import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import CardElement from "./Card";
import Button from "../buttons/Button";
import RoomItemModal from "../dialogs/RoomItemModal";
import {
  getNumToolsInRoom,
  getNumMachinesInRoom,
} from "../../../utils/roomUtils";

const StyledUl = styled("ul")`
  list-style: none;
  padding: 0;
  margin-bottom: 4rem;
`;

const RoomItemListCard = (props) => {
  const room = props.room;
  const roomitems = room.roomitems;
  const numTools = getNumToolsInRoom(room) + getNumMachinesInRoom(room);
  localStorage.setItem("redirectFromRoomItem", props.type);

  return (
    <CardElement>
      <Typography variant="h4">Tools In Room</Typography>
      <p>{numTools} in Use</p>
      <StyledUl>
        {roomitems.map((roomitem) => (
          <li key={roomitem._id}>
            <RoomItemModal roomitem={roomitem} />
          </li>
        ))}
      </StyledUl>
      <Button bottom to={`/rooms/items/${room._id}`}>
        Edit Tools
      </Button>
    </CardElement>
  );
};

export default RoomItemListCard;
