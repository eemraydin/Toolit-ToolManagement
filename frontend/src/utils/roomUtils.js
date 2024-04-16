const numToolsInRoom = (roomObj, toolType = "tool") => {
  let result = 0;
  try {
    roomObj.roomitems.map((roomItem) => {
      if (roomItem.item.type == toolType) {
        result += roomItem.quantity;
      }
    });
  } catch (err) {
    return 0;
  }
  return result;
};

const getNumToolsInRoom = (roomObj) => {
  return numToolsInRoom(roomObj, "tool");
};

const getNumMachinesInRoom = (roomObj) => {
  return numToolsInRoom(roomObj, "machine");
};

const hasProjectInRoom = (roomObj) => {
  return roomObj && roomObj.project ? true : false;
};

export { getNumToolsInRoom, getNumMachinesInRoom, hasProjectInRoom };
