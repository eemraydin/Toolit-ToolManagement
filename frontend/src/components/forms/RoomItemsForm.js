import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Typography, useMediaQuery } from "@mui/material";

import { fetchRoomById } from "../../services/roomsApi";
import { deleteRoomItem, updateRoomItem } from "../../services/roomItemsApi";
import Button from "../elements/buttons/Button";
import CardElement from "../elements/cards/Card";
import RoomItemsTable from "../elements/tables/RoomItemsTable";
import SuccessSnackbar from "../elements/dialogs/SuccessSnackbar";

const StyledContainer = styled("div")`
  width: 100%;
  margin-bottom: 3rem;
`;

export function loader({ params }) {
  return fetchRoomById(params.roomId);
}

const RoomItems = () => {
  const navigate = useNavigate();
  const room = useLoaderData();
  let roomitems = room.roomitems;
  const redirectTo =
    localStorage.getItem("redirectFromRoomItem") == "project"
      ? `/projects/${room.project}`
      : `/rooms/${room._id}`;

  const [roomItemSelection, setRoomItemSelection] = useState([]);
  const [error, setError] = useState([]);
  const [state, setState] = useState({open: false});
  const [message, setMessage] = useState();

  const { open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleError = (value) => {
    setError(value);
  };

  const handleSelectionChange = (value) => {
    setRoomItemSelection(value);
  };

  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  const deleteItems = async () => {
    if (!roomItemSelection || roomItemSelection.length < 1) {
      return;
    }
    try {
      roomItemSelection.map(async (roomItemId) => {
        await deleteRoomItem(roomItemId).then(() => {
          setMessage("Successfully removed");
          setState({open: true})
          roomitems = fetchRoomById(room.id).roomItems;
          navigate(`/rooms/items/${room._id}`);
        });
      });
    } catch (err) {}
  };

  const updateItems = async () => {
    handleError([]);
    if (!roomItemSelection || roomItemSelection.length < 1) {
      return;
    }
    try {
      let arrErrors = [];

      Promise.all(
        roomItemSelection.map(async (roomItemId) => {
          await updateRoomItem(roomItemId, {
            quantity: document.getElementById(`quantity_${roomItemId}`).value,
          }).catch((err) => {
            arrErrors.push({ id: roomItemId, error: err.response.data.error });
            handleError(arrErrors);
          });
        })
      ).then(() => {
        setMessage("Successfully updated")
        setState({open: true})
        setRoomItemSelection([]);
        roomitems = fetchRoomById(room.id).roomItems;
        navigate(`/rooms/items/${room._id}`);
      });
    } catch (err) {}
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
    <SuccessSnackbar
        open={open}
        onClose={handleClose}
        message={message}
      />
      {isMobile ? (
        <StyledContainer>
          <div style={{ display: "grid" }}>
            <div>
              <Button gray left to={redirectTo}>
                Back
              </Button>
            </div>
            <div>
              <Button inverse>Report Issue</Button>
              <Button to={`/rooms/items/new/${room._id}`}>
                Assign Item to Room
              </Button>
            </div>
          </div>
          <Typography variant="h2">{room.name}: Tools In Room</Typography>
          <form>
            <RoomItemsTable
              isMobile
              type="roomitem"
              items={roomitems}
              itemSelection={roomItemSelection}
              error={error}
              handleSelectionChange={(e) => handleSelectionChange(e)}
            />
          </form>
          <div>
            <Button green type="submit" onClick={handleSubmit(updateItems)}>
              Save
            </Button>
            <Button red type="submit" onClick={handleSubmit(deleteItems)}>
              Remove
            </Button>
          </div>
        </StyledContainer>
      ) : (
        <StyledContainer>
          <div className="flexContainer">
            <Typography variant="h2">{room.name}: Tools In Room</Typography>
            <div>
              <Button inverse>Report Issue</Button>
              <Button to={`/rooms/items/new/${room._id}`}>
                Assign Item to Room
              </Button>
            </div>
          </div>
          <CardElement>
            <form>
              <RoomItemsTable
                type="roomitem"
                items={roomitems}
                itemSelection={roomItemSelection}
                error={error}
                handleSelectionChange={(e) => handleSelectionChange(e)}
              />
              <div>
                <Button green type="submit" onClick={handleSubmit(updateItems)}>
                  Save
                </Button>
                <Button red type="submit" onClick={handleSubmit(deleteItems)}>
                  Remove
                </Button>
                <Button gray left to={redirectTo}>
                  Back
                </Button>
              </div>
            </form>
          </CardElement>
        </StyledContainer>
      )}
    </>
  );
};

export default RoomItems;
