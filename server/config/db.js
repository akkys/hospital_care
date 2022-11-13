const mongoose = require("mongoose");
require("dotenv").config();

const db = "mongodb://localhost:27017/hospitalCare";

const connectDb = async () => {
  try {
    const res = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
