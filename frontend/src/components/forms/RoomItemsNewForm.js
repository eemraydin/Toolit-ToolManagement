import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Typography, useMediaQuery } from "@mui/material";

import { fetchItems } from "../../services/api";
import { fetchRoomById } from "../../services/roomsApi";
import {
  deleteRoomItem,
  updateRoomItem,
  createRoomItem,
} from "../../services/roomItemsApi";
import Button from "../elements/buttons/Button";
import CardElement from "../elements/cards/Card";
import RoomItemsTable from "../elements/tables/RoomItemsTable";
import { getRoomItemId } from "../../utils/roomItemUtils";
import SuccessSnackbar from "../elements/dialogs/SuccessSnackbar";

const StyledContainer = styled("div")`
  width: 100%;
  margin-bottom: 3rem;
`;

export const loader = async ({ params }) => {
  const room = await fetchRoomById(params.roomId);
  const items = await fetchItems();
  return { room, items };
};

const RoomItemsNew = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  let items = data.items;
  const room = data.room;

  const [itemSelection, setItemSelection] = useState([]);
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
    setItemSelection(value);
  };

  const {
    formState: { errors },
    handleSubmit,
  } = useForm();

  const returnItems = async () => {
    handleError([]);
    if (!itemSelection || itemSelection.length < 1) {
      return;
    }
    try {
      itemSelection.map(async (itemId) => {
        const roomItemId = getRoomItemId(items, itemId, room._id);
        if (roomItemId) {
          await deleteRoomItem(roomItemId).then(async () => {
            setItemSelection([]);
            navigate(`/rooms/items/new/${room._id}`);
          });
        }
      });
    } catch (err) {}
  };

  const checkInItems = async () => {
    handleError([]);
    if (!itemSelection || itemSelection.length < 1) {
      return;
    }
    try {
      let arrErrors = [];
      Promise.all(
        itemSelection.map(async (itemId) => {
          const roomItemId = getRoomItemId(items, itemId, room._id);
          if (roomItemId) {
            setMessage("Successfully updated")
            await updateRoomItem(roomItemId, {
              quantity: Number(
                document.getElementById(`quantity_${itemId}`).value
              ),
            }).catch((err) => {
              arrErrors.push({
                id: itemId,
                error: err.response.data.error,
              });
              handleError(arrErrors);
            });
          } else {
            setMessage("Successfully added")
            await createRoomItem({
              quantity: Number(
                document.getElementById(`quantity_${itemId}`).value
              ),
              room: room._id,
              item: itemId,
            }).catch((err) => {
              arrErrors.push({
                id: itemId,
                error: err.response.data.error,
              });
              handleError(arrErrors);
            });
          }
        })
      ).then(() => {
        setState({open: true})
        setItemSelection([]);
        navigate(`/rooms/items/new/${room._id}`);
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
              <Button gray left to={`/rooms/items/${room._id}`}>
                Back
              </Button>
            </div>
          </div>
          <Typography variant="h2">{room.name}: Add Tools In Room</Typography>
          <CardElement>
            <form>
              <RoomItemsTable
                isMobile
                type="inventory"
                items={items}
                roomId={room._id}
                itemSelection={itemSelection}
                error={error}
                handleSelectionChange={(e) => handleSelectionChange(e)}
              />
              <div>
                <Button
                  green
                  type="submit"
                  onClick={handleSubmit(checkInItems)}
                >
                  Save
                </Button>
                <Button red type="submit" onClick={handleSubmit(returnItems)}>
                  Remove
                </Button>
              </div>
            </form>
          </CardElement>
        </StyledContainer>
      ) : (
        <StyledContainer>
          <div className="flexContainer">
            <Typography variant="h2">{room.name}: Add Tools In Room</Typography>
          </div>
          <CardElement>
            <form>
              <RoomItemsTable
                type="inventory"
                items={items}
                roomId={room._id}
                itemSelection={itemSelection}
                error={error}
                handleSelectionChange={(e) => handleSelectionChange(e)}
              />
              <div>
                <Button
                  green
                  type="submit"
                  onClick={handleSubmit(checkInItems)}
                >
                  Save
                </Button>
                <Button red type="submit" onClick={handleSubmit(returnItems)}>
                  Remove
                </Button>
                <Button gray left to={`/rooms/items/${room._id}`}>
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

export default RoomItemsNew;
