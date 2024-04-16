import { fetchData, sendData, updateData, deleteData } from "./api";

const roomsEndpoint = "rooms";

const fetchRooms = () => {
  return fetchData(roomsEndpoint);
};

const fetchRoomById = (roomId) => {
  return fetchData(roomsEndpoint, roomId);
};

const createRoom = (roomObj) => {
  return sendData(roomsEndpoint, roomObj);
};

const updateRoom = (roomId, roomObj) => {
  return updateData(roomsEndpoint, roomId, roomObj);
};

const deleteRoom = (roomId) => {
  return deleteData(roomsEndpoint, roomId);
};

export { fetchRooms, fetchRoomById, createRoom, updateRoom, deleteRoom };
