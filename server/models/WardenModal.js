const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddWarden = new Schema(
  {
    name: { type: String, required: true },
    empId: { type: String, required: true },
    dob: { type: String, required: true },
    joinDate: { type: String, required: true },
    contact: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Warden = mongoose.model("Warden", AddWarden);

module.exports = Warden;
