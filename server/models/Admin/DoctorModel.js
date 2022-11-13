const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    expert: { type: String, required: true },
    desc: { type: String, required: true },
    time: { type: String, required: true },
    available: { type: String, required: true },
    exp: { type: String, required: true },
    contact: { type: String, required: true },
    qualification: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Docs = mongoose.model("Docs", DocSchema);

module.exports = Docs;
