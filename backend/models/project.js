const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    roomId: { type: mongoose.Types.ObjectId, ref: "Room" },
    image: { type: String },
    datecompleted: { type: Date },
    team: new mongoose.Schema({
      teamname: { type: String, trim: true },
      members: [
        {
          firstname: { type: String, required: true, trim: true },
          lastname: { type: String, required: true, trim: true },
          image: { type: String, required: false },
        },
      ],
    }),
  },
  opts
);

ProjectSchema.virtual("completed").set(function (value) {
  if (value == true) {
    const datecompleted = new Date();
    this.set({ datecompleted });
  }
});

ProjectSchema.plugin(uniqueValidator);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
