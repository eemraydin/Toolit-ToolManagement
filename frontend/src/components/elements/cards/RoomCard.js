import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import CardElement from "./Card";
import ImageCard from "./ImageCard";
import Button from "../buttons/Button";
import BasicTable from "../tables/BasicTable";
import {
  getNumToolsInRoom,
  getNumMachinesInRoom,
  hasProjectInRoom,
} from "../../../utils/roomUtils";

const StyledHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledP = styled("p")`
  margin: 0;
`;

const RoomCard = (props) => {
  const room = props.room;

  const createTableRow = (name, value) => {
    return { name, value };
  };

  const createRoomInfoTableRows = (roomObj) => {
    let result = [];
    result.push(createTableRow("Tools", getNumToolsInRoom(roomObj)));
    result.push(createTableRow("Machines", getNumMachinesInRoom(roomObj)));
    result.push(createTableRow("Projects", Number(hasProjectInRoom(roomObj))));
    return result;
  };

  return (
    <CardElement>
      <StyledHeader>
        <Typography variant="h4" style={{ marginRight: "1rem" }}>
          {room.name}
        </Typography>
        <StyledP>
          {room.openinghours} - {room.closinghours}
        </StyledP>
      </StyledHeader>
      {room.image && <ImageCard src={room.image} alt={`room ${room.name}`} />}
      <BasicTable rows={createRoomInfoTableRows(room)} />
      <Button to={`/rooms/${room._id}`}>See More</Button>
    </CardElement>
  );
};

export default RoomCard;
