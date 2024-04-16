const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomItemSchema = new Schema({
  quantity: { type: Number, min: 1, required: true, default: 1 },
  room: { type: mongoose.Types.ObjectId, ref: "Room", required: true },
  item: { type: mongoose.Types.ObjectId, ref: "Item", required: true },
});

const RoomItem = mongoose.model("RoomItem", RoomItemSchema);
module.exports = RoomItem;
