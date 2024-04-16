const mongoose = require("mongoose");

Room = require("../models/room");
Item = require("../models/item");
const { storeImage } = require("../utils/storage");

const getRooms = async (req, res) => {
  const id = req.params.roomId;
  if (typeof id == "undefined") {
    await Room.find({})
      .populate({
        path: "roomitems",
        populate: {
          path: "item",
          model: "Item",
        },
      })
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    await Room.findOne({ _id: id })
      .populate({
        path: "roomitems",
        populate: {
          path: "item",
          model: "Item",
          populate: {
            path: "roomitems",
            model: "RoomItem",
          },
        },
      })
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

const createRoom = async (req, res) => {
  let room = new Room(req.body);

  if (req.files) {
    await storeImage(req.files.file, "rooms")
      .then((result) => {
        room.image = result.Location;
      })
      .catch((err) => {
        res.status(500).json(err);
        return;
      });
  }

  await room
    .save()
    .then((results) => {
      if (results == null) {
        res.status(404).json(results);
      } else {
        res.status(201).json({ url: req.originalUrl, data: results });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const updateRoom = async (req, res) => {
  const { name, hours, description } = req.body;
  const id = req.params.roomId;

  let room;
  try {
    room = await Room.findById(id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!room) {
    res.status(404).json(room);
    return;
  }

  room.name = name ?? room.name;
  room.hours = hours ?? room.hours;
  room.description = description ?? room.description;

  if (req.files) {
    await storeImage(req.files.file, "rooms")
      .then((result) => {
        room.image = result.Location;
      })
      .catch((err) => {
        res.status(500).json(err);
        return;
      });
  }

  try {
    await room.save();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ room: room.toObject({ getters: true }) });
};

const deleteRoom = async (req, res) => {
  const id = req.params.roomId;

  let room;
  try {
    room = await Room.findById(id).populate("roomitems");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!room) {
    res.status(404).json(room);
    return;
  }

  let items;
  try {
    items = await Item.find({}).populate("roomitems");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!items) {
    res.status(404).json(items);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // delete related room items in items
    for (let i = items.length - 1; i >= 0; i--) {
      for (let j = items[i].roomitems.length - 1; j >= 0; j--) {
        const targetRoomItem = items[i].roomitems[j];
        if (targetRoomItem.room._id.toString() == room.id) {
          items[i].roomitems.pull(targetRoomItem);
        }
      }
      await items[i].save({ session: sess });
    }

    // delete room and related room items
    for (let i = room.roomitems.length - 1; i >= 0; i--) {
      await room.roomitems[i].deleteOne({ session: sess });
    }
    await room.deleteOne({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Deleted room." });
};

module.exports = { getRooms, createRoom, updateRoom, deleteRoom };
