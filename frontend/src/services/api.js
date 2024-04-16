import axios from "axios";

const API_URL = "https://toolit-dev.onrender.com/api";
// const API_URL = "http://localhost:8080/api";

const newRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const fetchData = async (endpoint, id = null) => {
  const url = id ? `${API_URL}/${endpoint}/${id}` : `${API_URL}/${endpoint}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      id
        ? `Error fetching ${endpoint.slice(0, -1)} with id ${id}:`
        : `Error fetching ${endpoint}:`,
      error.response
    );
    throw error;
  }
};

const sendData = async (endpoint, data) => {
  try {
    const auth = JSON.parse(localStorage.getItem("currentUser"));
    const response = await axios.post(`${API_URL}/${endpoint}`, data, {headers: {"Authorization": auth.token}});
  } catch (error) {
    console.error(`Error sending ${endpoint.slice(0, -1)}:`, error.response);
    throw error;
  }
};

const updateData = async (endpoint, id, data) => {
  try {
    const auth = JSON.parse(localStorage.getItem("currentUser"));
    const response = await axios.patch(`${API_URL}/${endpoint}/${id}`, data, {headers: {"Authorization": auth.token}});
    return response && response.status == 200;
  } catch (error) {
    console.error(
      `Error updating ${endpoint.slice(0, -1)} with id ${id}:`,
      error.response
    );
    throw error;
  }
};

const deleteData = async (endpoint, id) => {
  try {
    const auth = JSON.parse(localStorage.getItem("currentUser"));
    const response = await axios.delete(`${API_URL}/${endpoint}/${id}`, {headers: {"Authorization": auth.token}});
  } catch (error) {
    console.error(
      `Error deleting ${endpoint.slice(0, -1)} with id ${id}:`,
      error.response
    );
    throw error;
  }
};

const fetchItems = async (itemId = null) => {
  try {
    const url = itemId ? `${API_URL}/items/${itemId}` : `${API_URL}/items`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      itemId
        ? `Error fetching item with id ${itemId}:`
        : "Error fetching items:",
      error
    );
    throw error;
  }
};

const addItem = async (itemObject) => {
  try {
    const url = `${API_URL}/items`;
    const auth = JSON.parse(localStorage.getItem("currentUser"));
    const response = await axios.post(url, itemObject, {headers: {"Authorization": auth.token}});
  } catch (error) {
    console.error("Error adding item:", error.response.data);
    throw error;
  }
};

const editItem = async (itemId, itemObject) => {
  try {
    const url = `${API_URL}/items/${itemId}`;
    return await axios.patch(url, itemObject);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

const reserveItem = async (id, data) => {
  try {
    const auth = JSON.parse(localStorage.getItem("currentUser"));
    const response = await axios.patch(`${API_URL}/items/reserve/${id}`, data, {headers: {"Authorization": auth.token}});
  } catch (error) {
    console.error(`Error updating id ${id}:`, error.response.data);
    throw error;
  }
};

export {
  fetchData,
  sendData,
  updateData,
  deleteData,
  fetchItems,
  editItem,
  addItem,
  reserveItem,
  newRequest,
};
