import { fetchData, sendData, updateData, deleteData } from "./api";

const roomsEndpoint = "roomitems";

const fetchRoomItemById = (roomItemId) => {
  return fetchData(roomsEndpoint, roomItemId);
};

const createRoomItem = (roomItemObj) => {
  return sendData(roomsEndpoint, roomItemObj);
};

const updateRoomItem = (roomItemId, roomItemObj) => {
  return updateData(roomsEndpoint, roomItemId, roomItemObj);
};

const deleteRoomItem = (roomItemId) => {
  return deleteData(roomsEndpoint, roomItemId);
};

export { fetchRoomItemById, createRoomItem, updateRoomItem, deleteRoomItem };
