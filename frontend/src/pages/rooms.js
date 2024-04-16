import React from "react";
import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

import { fetchRooms } from "../services/roomsApi";
import RoomCard from "../components/elements/cards/RoomCard";
import Button from "../components/elements/buttons/Button";

const StyledContainer = styled("div")`
  width: 100%;
`;

export function loader() {
  return fetchRooms();
}

const Rooms = () => {
  const rooms = useLoaderData();

  return (
    <StyledContainer>
      <div className="flexContainer">
        <Typography variant="h2">Rooms</Typography>
        <Button to={"/rooms/new"}>Add New Room</Button>
      </div>
      <Grid container spacing={4}>
        {rooms ? (
          rooms.map((room) => (
            <Grid item key={room._id} xs={12} md={4}>
              <RoomCard room={room} />
            </Grid>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
      <Outlet />
    </StyledContainer>
  );
};

export default Rooms;
