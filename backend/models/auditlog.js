const mongoose = require("mongoose");
const { auditLogTypes } = require("../utils/enum");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const AuditlogSchema = new Schema({
  actiondate: {type: Date, required: false },
  user: { type: mongoose.Types.ObjectId, ref: "User"},
  type: {
            type: String,
            enum: Object.keys(auditLogTypes()),
            required: true
        },
  room: { type: mongoose.Types.ObjectId, ref: "Room"},
  quantity: { type: Number, required: true },
  issuetype: {type: String, enum: ["broken", "missing", "out of order"]}
}, opts);

AuditlogSchema.virtual('log', {
    ref: 'Room',
    localField: 'room',
    foreignField: '_id',
    justOne: true
  }).get(function(room){
    return room == undefined ? 
                auditLogTypes(this.quantity, null, this.issuetype)[this.type].template
                    : auditLogTypes(this.quantity, room.name, this.issuetype)[this.type].template
  });

AuditlogSchema.virtual('userlog', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true
  }).get(function(user){
    return user == undefined ? null : user.name;
  });

module.exports = AuditlogSchema;
