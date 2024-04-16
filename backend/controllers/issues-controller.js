const mongoose = require("mongoose");

Issue = require("../models/issue");
Item = require("../models/item");
const { auditLogTypes } = require("../utils/enum");
const { decryptToken } = require("../utils/decryptToken");

const {
  AvailabilityStatus,
  checkIsAvailableQuantity,
} = require("../utils/quantity-validation");

const getIssues = async (req, res) => {
  const id = req.params.issueId;
  if (typeof id == "undefined") {
    await Issue.find({})
      .populate("item")
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    await Issue.findOne({ _id: id })
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
  }
};

const createIssue = async (req, res) => {
  const { quantity, type, item, priority, room } = req.body;
  const payload = decryptToken(req.headers.authorization);

  let user;
  try {
    user = await User.findOne({ _id: payload.id });
  } catch (err) {
    res.status(401).json("Unauthorized");
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

  // check uniqueness of issues in item by itemId and type
  try {
    if (itemObj.issues.filter((issue) => issue.type == type).length > 0) {
      res.status(422).json({
        error:
          "The same type of issue is already reported. Please use update function.",
      });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
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

  let newIssue = new Issue(req.body);
  try {
    itemObj.auditlog.push({
      actiondate: new Date(),
      room: roomObj ? roomObj._id : null,
      user: await user.id,
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

    await newIssue.save({ session: sess });
    itemObj.issues.push(newIssue);
    await itemObj.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(201).json({ issue: newIssue.toObject({ getters: true }) });
};

//used for resolving issues
const updateIssue = async (req, res) => {
  const { quantity, type, priority } = req.body;
  const id = req.params.issueId;
  const payload = decryptToken(req.headers.authorization);

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
  issue.quantity = quantity
    ? issue.quantity - Number(quantity)
    : issue.quantity;
  issue.type = type ?? issue.type;
  issue.priority = priority ?? issue.priority;
  issue.status = issue.quantity == 0 ? "resolved" : issue.status;

  try {
    itemObj.auditlog.push({
      actiondate: new Date(),
      user: await user.id,
      type: auditLogTypes().RESOLVE.name,
      quantity: Number(quantity),
    });

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await issue.save({ session: sess });
    await itemObj.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ issue: issue.toObject({ getters: true }) });
};

const deleteIssue = async (req, res) => {
  const id = req.params.issueId;

  let issue;
  try {
    issue = await Issue.findById(id).populate({
      path: "item",
      populate: {
        path: "issues",
        model: "Issue",
      },
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!issue) {
    res.status(404).json(issue);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // remove issue in item but keep itself as resolved state
    issue.item.issues.pull(issue);
    await issue.item.save({ session: sess });

    issue.status = "resolved";
    await issue.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Deactivated issue." });
};

const hardDeleteIssue = async (req, res) => {
  const id = req.params.issueId;

  let issue;
  try {
    issue = await Issue.findById(id).populate({
      path: "item",
      populate: {
        path: "issues",
        model: "Issue",
      },
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!issue) {
    res.status(404).json(issue);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // remove issue in item but keep itself as resolved state
    issue.item.issues.pull(issue);
    await issue.item.save({ session: sess });

    await issue.deleteOne({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Delete issue." });
};

module.exports = {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  hardDeleteIssue,
};
