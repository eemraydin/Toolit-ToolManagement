const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: { type: String, required: true, unique: true },
  hours: { type: String },
  openinghours: { type: String },
  closinghours: { type: String },
  description: { type: String, maxlength: 300 },
  image: { type: String },
  project: { type: mongoose.Types.ObjectId, ref: "Project" },
  roomitems: [{ type: mongoose.Types.ObjectId, ref: "RoomItem" }],
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
