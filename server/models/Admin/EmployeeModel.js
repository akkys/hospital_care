const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: Schema.Types.ObjectId, ref: "user" },
    designationId: { type: Schema.Types.ObjectId, ref: "designation" },
    empId: { type: String, required: true },
    deptId: { type: Schema.Types.ObjectId, ref: "department" },
    dob: { type: String, required: true },
    joinDate: { type: String, required: true },
    contact: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Emps = mongoose.model("Emps", EmpSchema);

module.exports = Emps;
