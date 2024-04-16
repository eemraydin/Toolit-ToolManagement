const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const auditlogSchema = require("../models/auditlog");

const ItemSchema = new Schema({
  name: { type: String, required: true},
  type: {
    type: String,
    enum: ["tool", "machine"],
    required: true,
    default: "tool",
  },
  reference: { type: String, unique: true },
  brand: { type: String },
  size: { type: String },
  description: { type: String },
  image: { type: String },
  totalcount: { type: Number, min: 0, required: true, default: 1 },
  threshold: { type: Number, min: 0, default: 0 },
  active: { type: Boolean, default: true },
  roomitems: [{ type: mongoose.Types.ObjectId, ref: "RoomItem" }],
  issues: [{ type: mongoose.Types.ObjectId, ref: "Issue" }],
  auditlog: { type: [auditlogSchema]}
}, opts);

ItemSchema.virtual('availablecount')
.get(function () {
    return this.totalcount - getIssueCount(this.issues);
}).set(function(value){
  this.set({ totalcount: Number(value) + getIssueCount(this.issues) })
})

ItemSchema.virtual('status').get(function () {
  const availableCount = this.totalcount - getIssueCount(this.issues);
  return (availableCount) <= 0 ? "Out of stock" 
        : (availableCount) > this.threshold ? "Available" : "Low on stock"
})

ItemSchema.virtual('inrooms').get(function () {
  let usedCount = 0;
  this.roomitems.forEach(r => 
    usedCount += r.quantity
  );
  return usedCount;
})

const getIssueCount = (issues)=>{
  let issueCount = 0;
  issues.forEach(i => 
    issueCount += i.quantity
  );
  return Number(issueCount);
}
const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;