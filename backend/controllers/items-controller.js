const mongoose = require("mongoose");
const { auditLogTypes } = require("../utils/enum");
Item = require("../models/item");
Room = require("../models/room");
Issue = require("../models/issue");
User = require("../models/user");
const { storeImage } = require("../utils/storage");
const { decryptToken } = require("../utils/decryptToken");

const {
  AvailabilityStatus,
  checkIsAvailableQuantity,
} = require("../utils/quantity-validation");

const searchItems = async (req, res) => {
  let items;
  try {
    const keyword = req.query.q.toLowerCase();

    items = await Item.find({})
      .populate({
        path: "roomitems",
        populate: {
          path: "room",
          model: "Room",
        },
      })
      .populate("issues");

    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.reference.toLowerCase().includes(keyword) ||
        item.brand.toLowerCase().includes(keyword)
    );

    if (!items || items.length == 0) {
      res.status(404).json({ error: "No search results found." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json(items);
};

const getItems = async (req, res) => {
  const id = req.params.itemId;

  if (typeof id == "undefined") {
    await Item.find({})
      .select("-auditlog")
      .populate("roomitems")
      .populate("issues")
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    await Item.findOne({ _id: id })
      .populate({
        path: "roomitems",
        populate: {
          path: "room",
          model: "Room",
        },
      })
      .populate({
        path: "issues",
      })
      .populate("auditlog.log")
      .populate("auditlog.userlog")
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

const createItem = async (req, res) => {
  let item = new Item(req.body);
  let payload = decryptToken(req.headers.authorization);

  try {
    let user = await User.findOne({ _id: payload.id });

    item.auditlog.push({
      actiondate: new Date(),
      user: await user.id,
      type: auditLogTypes().RECEIVE.name,
      quantity: req.body.availablecount,
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  if (req.files) {
    storeImage(req.files.file, "items")
      .then(function (result) {
        item.image = result.Location;
        item.save().then((results) => {
          if (results == null) {
            res.status(404).json(results);
          } else {
            res.status(201).json({ url: req.originalUrl, data: results });
          }
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    item
      .save()
      .then((results) => {
        if (results == null) {
          res.status(404).json(results);
        } else {
          res.status(201).json({ url: req.originalUrl, data: results });
        }
      })
      .catch((err) => {
        if (err.code == "11000" && err.keyValue.reference) {
          res.status(403).json({ error: `SKU already exists.` });
          return;
        }
        res.status(500).json(err);
      });
  }
};

const updateItem = async (req, res) => {
  const {
    name,
    type,
    reference,
    brand,
    size,
    description,
    image,
    threshold,
    active,
  } = req.body;
  const id = req.params.itemId;

  let item;
  try {
    item = await Item.findById(id)
      .populate("auditlog.log")
      .populate({
        path: "issues",
      })
      .populate({
        path: "roomitems",
        populate: {
          path: "room",
          model: "Room",
        },
      });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!item) {
    res.status(404).json(item);
    return;
  }

  item.name = name ?? item.name;
  item.type = type ?? item.type;
  item.reference = reference ?? item.reference;
  item.brand = brand ?? item.brand;
  item.size = size ?? item.size;
  item.description = description ?? item.description;
  item.image = image ?? item.image;
  item.threshold = threshold ?? item.threshold;
  item.active = active ?? item.active;

  if (req.files) {
    storeImage(req.files.file, "items").then(function (result) {
      item.image = result.Location;
      item
        .save()
        .then(() => {
          res.status(200).json({ item: item.toObject({ getters: true }) });
        })
        .catch((err) => {
          if (err.code == "11000" && err.keyValue.reference) {
            res.status(403).json({ error: `SKU already exists.` });
            return;
          }
          res.status(500).json(err);
          return;
        });
    });
  } else {
    item
      .save()
      .then(() => {
        res.status(200).json({ item: item.toObject({ getters: true }) });
      })
      .catch((err) => {
        if (err.code == "11000" && err.keyValue.reference) {
          res.status(403).json({ error: `SKU already exists.` });
          return;
        }
        res.status(500).json(err);
        return;
      });
  }
};

const deactivateItem = async (req, res) => {
  const id = req.params.itemId;

  let item;
  try {
    item = await Item.findById(id).populate("roomitems");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!item) {
    res.status(404).json(item);
    return;
  }

  let rooms;
  try {
    rooms = await Room.find({}).populate("roomitems");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!rooms) {
    res.status(404).json(rooms);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // delete related room items in rooms
    for (let i = rooms.length - 1; i >= 0; i--) {
      for (let j = rooms[i].roomitems.length - 1; j >= 0; j--) {
        const targetRoomItem = rooms[i].roomitems[j];
        if (targetRoomItem.item._id.toString() == item.id) {
          rooms[i].roomitems.pull(targetRoomItem);
        }
      }
      await rooms[i].save({ session: sess });
    }

    // delete related room items
    for (let i = item.roomitems.length - 1; i >= 0; i--) {
      await item.roomitems[i].deleteOne({ session: sess });
      item.roomitems.pull(item.roomitems[i]);
    }
    item.active = false;
    await item.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Deactivated item." });
};

const deleteItem = async (req, res) => {
  const id = req.params.itemId;

  let item;
  try {
    item = await Item.findById(id).populate("roomitems");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!item) {
    res.status(404).json(item);
    return;
  }

  let rooms;
  try {
    rooms = await Room.find({}).populate("roomitems");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!rooms) {
    res.status(404).json(rooms);
    return;
  }

  let issues;
  try {
    issues = await Issue.find({});
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // delete related room items in rooms
    for (let i = rooms.length - 1; i >= 0; i--) {
      for (let j = rooms[i].roomitems.length - 1; j >= 0; j--) {
        const targetRoomItem = rooms[i].roomitems[j];
        if (targetRoomItem.item._id.toString() == item.id) {
          rooms[i].roomitems.pull(targetRoomItem);
        }
      }
      await rooms[i].save({ session: sess });
    }

    // delete related issues
    if (issues && issues.length > 0) {
      for (let i = issues.length - 1; i >= 0; i--) {
        if (issues[i].item._id.toString() == item.id) {
          await issues[i].deleteOne({ session: sess });
        }
      }
    }

    await item.deleteOne({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Deleted item." });
};

const receiveItem = async (req, res) => {
  const { quantity } = req.body;
  const id = req.params.itemId;
  let payload = decryptToken(req.headers.authorization);

  let item;
  try {
    item = await Item.findById(id).populate("auditlog.log").populate({
      path: "issues",
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!item) {
    res.status(404).json(item);
    return;
  }

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  try {
    item.totalcount = item.totalcount + Number(quantity);
    item.auditlog.push({
      actiondate: new Date(),
      user: await user.id,
      type: auditLogTypes().RECEIVE.name,
      quantity: quantity,
    });

    await item.save();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ item: item.toObject({ getters: true }) });
};

const recountItem = async (req, res) => {
  const { quantity } = req.body;
  const id = req.params.itemId;
  let payload = decryptToken(req.headers.authorization);

  let item;
  try {
    item = await Item.findById(id).populate("auditlog.log").populate({
      path: "issues",
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!item) {
    res.status(404).json(item);
    return;
  }

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  try {
    item.availablecount = Number(quantity);
    item.auditlog.push({
      actiondate: new Date(),
      user: await user.id,
      type: auditLogTypes().RECOUNT.name,
      quantity: quantity,
    });
    await item.save();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ item: item.toObject({ getters: true }) });
};

const reserveItem = async (req, res) => {
  const { quantity } = req.body;
  const id = req.params.roomItemId;
  let payload = decryptToken(req.headers.authorization);

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

  try {
    let user = await User.findOne({ _id: payload.id });

    itemObj.auditlog.push({
      actiondate: new Date(),
      user: await user.id,
      room: roomItem.room,
      type: auditLogTypes().RESERVE.name,
      quantity: quantity,
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  try {
    roomItem.quantity = roomItem.quantity + Number(quantity);

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

const reportItem = async (req, res) => {
  const { quantity, type, priority, status, room } = req.body;
  const id = req.params.issueId;
  let payload = decryptToken(req.headers.authorization);

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
    return;
  }

  let issue;
  try {
    issue = await Issue.findById(id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!issue) {
    res.status(404).json(issue);
    return;
  }

  if (!issue) {
    res.status(404).json(issue);
    return;
  }

  let itemObj;
  try {
    itemObj = await Item.findById(issue.item)
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

  let roomItemObj;
  let roomObj;

  if (room) {
    try {
      roomItemObj = await RoomItem.findOne({ room: room })
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

    if (!roomItemObj) {
      res.status(422).json({ error: "Item not found in selected room" });
      return;
    }

    if (roomItemObj.quantity < Number(quantity)) {
      res
        .status(422)
        .json({ error: "Quantity exceeds item count in selected room" });
      return;
    }

    roomItemObj.quantity = roomItemObj.quantity - Number(quantity);

    try {
      roomObj = await Room.findById(room);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
    if (!roomObj) {
      res.status(404).json(itemObj);
      return;
    }
  } else {
    if (itemObj.availablecount - itemObj.inrooms < Number(quantity)) {
      res
        .status(422)
        .json({ error: "Quantity exceeds item count in inventory." });
      return;
    }
  }

  try {
    const itemCount = Number(quantity) + issue.quantity;
    issue.quantity = itemCount ?? issue.quantity;
    issue.type = type ?? issue.type;
    issue.priority = priority ?? issue.priority;
    issue.status = status ?? issue.status;

    itemObj.auditlog.push({
      actiondate: new Date(),
      user: await user.id,
      room: roomObj ? roomObj._id : null,
      type: auditLogTypes().REPORT.name,
      issuetype: type,
      quantity: Number(quantity),
    });

    const sess = await mongoose.startSession();
    sess.startTransaction();

    if (roomItemObj) {
      if (roomItemObj.quantity < 1) {
        roomItemObj.room.roomitems.pull(roomItemObj);
        await roomItemObj.room.save({ session: sess });

        roomItemObj.item.roomitems.pull(roomItemObj);
        await roomItemObj.item.save({ session: sess });

        await roomItemObj.deleteOne({ session: sess });
      } else {
        await roomItemObj.save({ session: sess });
      }
    }
    await itemObj.save({ session: sess });
    await issue.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ issue: issue.toObject({ getters: true }) });
};
module.exports = {
  searchItems,
  getItems,
  createItem,
  updateItem,
  deactivateItem,
  deleteItem,
  receiveItem,
  recountItem,
  reserveItem,
  reportItem,
};
