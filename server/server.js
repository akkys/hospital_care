const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

//MongoDB connection
connectDb();

const PORT = process.env.PORT || 5000;

//Importing the Routes
const adminRoutes = require("./routes/Admin/AdminRoutes");
const empRoutes = require("./routes/Admin/EmployeeRoutes");
const docRoutes = require("./routes/Admin/DoctorRoutes");
const deptRoutes = require("./routes/Admin/DepartmentRoutes");
const designationRoutes = require("./routes/Admin/DesignationRoutes");
const labRoomRoutes = require("./routes/Admin/LaboratoryRoutes");
const branchRoutes = require("./routes/Admin/BranchRoutes");
const apptRoutes = require("./routes/AppointmentRoutes");
const patientRoutes = require("./routes/PatientRoutes");
const wardRoutes = require("./routes/WardRoutes");
const wardenRoutes = require("./routes/WardenRoutes");

app.use("/api", adminRoutes);
app.use("/api", empRoutes);
app.use("/api", docRoutes);
app.use("/api", deptRoutes);
app.use("/api", designationRoutes);
app.use("/api", labRoomRoutes);
app.use("/api", branchRoutes);
app.use("/api", apptRoutes);
app.use("/api", patientRoutes);
app.use("/api", wardRoutes);
app.use("/api", wardenRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
