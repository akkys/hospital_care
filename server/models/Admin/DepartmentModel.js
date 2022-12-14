const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
