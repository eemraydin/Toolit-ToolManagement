const mongoose = require("mongoose");
const { auditLogTypes } = require("../utils/enum");
const {  decryptToken } = require("../utils/decryptToken")

RoomItem = require("../models/room-item");
Room = require("../models/room");
Item = require("../models/item");


const {
  AvailabilityStatus,
  checkIsAvailableQuantity,
} = require("../utils/quantity-validation");

const getRoomItem = async (req, res) => {
  const id = req.params.roomItemId;
  await RoomItem.findOne({ _id: id })
    .populate("room")
    .populate({
      path: "item",
      populate: {
        path: "roomitems",
        model: "RoomItem",
      },
    })
    .exec()
    .then((results) => {
      res.status(results == null ? 404 : 200).json(results);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const createRoomItem = async (req, res) => {
  const { quantity, room, item } = req.body;
  let payload = decryptToken(req.headers.authorization);

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }
  
  let roomObj;
  try {
    roomObj = await Room.findById(room);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!roomObj) {
    res.status(404).json(roomObj);
    return;
  }

  let itemObj;
  try {
    itemObj = await Item.findById(item)
      .populate("roomitems")
      .populate("issues");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!itemObj) {
    res.status(404).json(itemObj);
    return;
  }

  // check uniqueness of roomId && itemId
  try {
    if (
      itemObj.roomitems.filter((roomitem) => roomitem.room == room).length > 0
    ) {
      res
        .status(422)
        .json({ error: "Already checked in. Please use update function." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  // check available quantities
  switch (checkIsAvailableQuantity(itemObj, quantity)) {
    case AvailabilityStatus.kNotAvailable:
      res.status(422).json({ error: "It exceeds available quantity." });
      return;
    case AvailabilityStatus.kInternalError:
      res
        .status(500)
        .json({ error: "Internal error when checking availability of item." });
      return;
  }

  let newRoomItem = new RoomItem(req.body);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newRoomItem.save({ session: sess });
    roomObj.roomitems.push(newRoomItem);
    await roomObj.save({ session: sess });
    itemObj.roomitems.push(newRoomItem);
    itemObj.auditlog.push({
      actiondate: new Date(),
      room: roomObj._id,
      user: await user.id,
      type: auditLogTypes().RESERVE.name,
      quantity: newRoomItem.quantity
    });
    await itemObj.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(201).json({ roomItem: newRoomItem.toObject({ getters: true }) });
};

const updateRoomItem = async (req, res) => {
  const { quantity } = req.body;
  const id = req.params.roomItemId;
  const payload = decryptToken(req.headers.authorization);

  let roomItem;
  try {
    roomItem = await RoomItem.findById(id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!roomItem) {
    res.status(404).json(roomItem);
    return;
  }

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  let itemObj;
  try {
    itemObj = await Item.findById(roomItem.item)
      .populate("roomitems")
      .populate("issues");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!itemObj) {
    res.status(404).json(itemObj);
    return;
  }

  switch (checkIsAvailableQuantity(itemObj, quantity - roomItem.quantity)) {
    case AvailabilityStatus.kNotAvailable:
      res.status(422).json({ error: "It exceeds available quantity." });
      return;
    case AvailabilityStatus.kInternalError:
      res
        .status(500)
        .json({ error: "Internal error when checking availability of item." });
      return;
  }
 

  try {
    const diff = quantity - roomItem.quantity;

    if(!(diff == 0)){
      itemObj.auditlog.push({
        actiondate: new Date(),
        room: roomItem.room,
        user: await user.id,
        type: diff > 0 ? auditLogTypes().RESERVE.name : auditLogTypes().RETURN.name,
        quantity: diff > 0 ? diff : -(diff)
      });
    }

    roomItem.quantity = quantity;

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await roomItem.save({ session: sess });
    await itemObj.save({ session: sess });
    await sess.commitTransaction();
    
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ roomItem: roomItem.toObject({ getters: true }) });
};

const deleteRoomItem = async (req, res) => {
  const id = req.params.roomItemId;
  const payload = decryptToken(req.headers.authorization);

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  let roomItem;
  try {
    roomItem = await RoomItem.findById(id)
      .populate({
        path: "room",
        populate: {
          path: "roomitems",
          model: "RoomItem",
        },
      })
      .populate({
        path: "item",
        populate: {
          path: "roomitems",
          model: "RoomItem",
        },
      });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!roomItem) {
    res.status(404).json(roomItem);
    return;
  }

  let itemObj;
  try {
    itemObj = await Item.findById(roomItem.item);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!itemObj) {
    res.status(404).json(itemObj);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    roomItem.room.roomitems.pull(roomItem);
    await roomItem.room.save({ session: sess });

    roomItem.item.roomitems.pull(roomItem);
    await roomItem.item.save({ session: sess });

    await roomItem.deleteOne({ session: sess });

    itemObj.auditlog.push({
      actiondate: new Date(),
      room: roomItem.room,
      user: await user.id,
      type: auditLogTypes().RETURN.name,
      quantity: roomItem.quantity
    });
    await itemObj.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Deleted room item." });
};

module.exports = {
  getRoomItem,
  createRoomItem,
  updateRoomItem,
  deleteRoomItem,
};
