let Department = require("../../models/Admin/DepartmentModel");

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const newDepartment = new Department({
      name,
      userId: req.user,
    });

    const savedDepartment = await newDepartment.save();
    res.json(savedDepartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const deptData = await Department.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (deptData) {
      deptData.name = req.body.name;
    }

    const updatedDepartment = await deptData.save();
    res.json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDepartment = async (req, res) => {
  const departmentData = await Department.find({});
  res.json(departmentData);
};

const deleteDepartment = async (req, res) => {
  const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
  res.json(deletedDepartment);
};

module.exports = {
  addDepartment,
  updateDepartment,
  getDepartment,
  deleteDepartment,
};
