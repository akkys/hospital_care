const Emps = require("../../models/Admin/EmployeeModel");

const addEmp = async (req, res) => {
  try {
    const {
      name,
      email,
      designationId,
      empId,
      deptId,
      dob,
      joinDate,
      bloodGroup,
      contact,
      gender,
    } = req.body;

    const newEmps = new Emps({
      name,
      email,
      designationId,
      empId,
      dob,
      joinDate,
      bloodGroup,
      contact,
      gender,
      userId: req.user,
      deptId,
    });

    const savedEmps = await newEmps.save();
    res.json(savedEmps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmp = async (req, res) => {
  try {
    const empsData = await Emps.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (empsData) {
      empsData.name = req.body.name;
      empsData.email = req.body.email;
      empsData.designationId = req.body.designationId;
      empsData.empId = req.body.empId;
      empsData.deptId = req.body.deptId;
      empsData.dob = req.body.dob;
      empsData.joinDate = req.body.joinDate;
      empsData.bloodGroup = req.body.bloodGroup;
      empsData.contact = req.body.contact;
      empsData.gender = req.body.gender;
    }

    const updatedEmps = await empsData.save();
    res.json(updatedEmps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllEmps = async (req, res) => {
  const empsData = await Emps.find({})
    .populate({ path: "email", select: "email" })
    .populate({
      path: "deptId",
      select: "name",
    })
    .populate({ path: "designationId", select: "name" });
  res.json(empsData);
};

const getEmps = async (req, res) => {
  const empsData = await Emps.findById({
    userId: req.user,
    _id: req.params.id,
  })
    .populate({ path: "email", select: "email" })
    .populate({ path: "deptId", select: "name" })
    .populate({ path: "designationId", select: "name" });
  res.json(empsData);
};

const deleteEmps = async (req, res) => {
  const deletedEmps = await Emps.findByIdAndDelete(req.params.id);
  res.json(deletedEmps);
};

module.exports = {
  addEmp,
  updateEmp,
  getAllEmps,
  getEmps,
  deleteEmps,
};
