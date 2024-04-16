const getItemObjById = (items, itemId) => {
  let result = null;
  try {
    for (const item of items) {
      if (item._id == itemId) {
        result = item;
        break;
      }
    }
  } catch (err) {
    return null;
  }
  return result;
};

const getRoomItemId = (items, itemId, roomId) => {
  const itemObj = getItemObjById(items, itemId);
  if (!itemObj) {
    return "";
  }
  let result = 0;
  try {
    for (const roomitem of itemObj.roomitems) {
      if (roomitem.room == roomId) {
        result = roomitem._id;
        break;
      }
    }
  } catch (err) {
    return "";
  }
  return result;
};

const getItemQuantityInRoom = (itemObj, roomId) => {
  let result = 0;
  try {
    for (const roomitem of itemObj.roomitems) {
      if (roomitem.room == roomId) {
        result = roomitem.quantity;
        break;
      }
    }
  } catch (err) {
    return 0;
  }
  return result;
};

export { getRoomItemId, getItemQuantityInRoom };
