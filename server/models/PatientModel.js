const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddPatient = new Schema({
  pid: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  admitDate: { type: String, required: true },
  status: { type: String, required: true },
  contact: { type: String, required: true },
  roomNum: { type: String, required: true },
  roomType: { type: String, required: true },
  docName: { type: String, required: true },
  dob: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  emergencyContact: { type: String },
  emergencyName: { type: String },
  relationship: { type: String },
  maritalStatus: { type: String, required: true },
  admitReason: { type: String, required: true },
  pastMedication: { type: String, required: true },
});

const Patient = mongoose.model("Patient", AddPatient);

module.exports = Patient;
