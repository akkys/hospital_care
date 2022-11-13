const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, default: "Not Mentioned" },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    date: { type: String, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    reason: { type: String, required: true },
    docName: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
