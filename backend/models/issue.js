const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema(
  {
    quantity: { type: Number, required: true, default: 1 },
    type: {
      type: String,
      enum: ["broken", "missing", "out of order" ],
      required: true,
      default: "broken",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },
    item: { type: mongoose.Types.ObjectId, ref: "Item", required: true },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;
