import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

import { fetchRoomById } from "../services/roomsApi";
import Button from "../components/elements/buttons/Button";
import CardElement from "../components/elements/cards/Card";
import ImageCard from "../components/elements/cards/ImageCard";
import RoomItemListCard from "../components/elements/cards/RoomItemListCard";
import CustomModal from "../components/elements/dialogs/CustomModal";
import EditNameForm from "../components/forms/EditNameForm";

const StyledContainer = styled("div")`
  width: 100%;
`;

const StyledH2 = styled("h2")`
  font-style: italic;
  margin-top: 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

export function loader({ params }) {
  return fetchRoomById(params.id);
}

const Room = () => {
  const room = useLoaderData();

  const [openEditRoomName, setOpenEditRoomName] = useState(false);
  const handleOpenEditRoomName = () => setOpenEditRoomName(true);
  const handleCloseEditRoomName = () => setOpenEditRoomName(false);

  return (
    <StyledContainer>
      <div className="flexContainer">
        <Typography variant="h2">Room</Typography>
        <Button gray to={"/rooms/"}>
          Back
        </Button>
      </div>
      <CardElement>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <div className="flexContainerLeft">
              <StyledH2>{room.name}</StyledH2>
              <CustomModal
                isEdit
                open={openEditRoomName}
                handleOpen={handleOpenEditRoomName}
                handleClose={handleCloseEditRoomName}
                description={
                  <EditNameForm
                    type="room"
                    project={room}
                    handleClose={handleCloseEditRoomName}
                  />
                }
              />
            </div>
            {room.image && (
              <ImageCard src={room.image} alt={`room ${room.name}`} wide />
            )}
            <Typography variant="h4">Description</Typography>
            <p>{room.description}</p>
          </Grid>
          <Grid item xs={12} md={5}>
            <RoomItemListCard type="room" key={room._id} room={room} />
          </Grid>
        </Grid>
      </CardElement>
    </StyledContainer>
  );
};

export default Room;
