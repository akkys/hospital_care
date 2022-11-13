let Designation = require("../../models/Admin/DesignationModel");

const addDesignation = async (req, res) => {
  try {
    const { name } = req.body;

    const newDesignation = new Designation({
      name,
      userId: req.user,
    });

    const savedDesignation = await newDesignation.save();
    res.json(savedDesignation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDesignation = async (req, res) => {
  try {
    const designationData = await Designation.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (designationData) {
      designationData.name = req.body.name;
    }

    const updatedDesignation = await designationData.save();
    res.json(updatedDesignation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDesignation = async (req, res) => {
  const designationData = await Designation.find();
  res.json(designationData);
};

const deleteDesignation = async (req, res) => {
  const deletedDesignation = await Designation.findByIdAndDelete(req.params.id);
  res.json(deletedDesignation);
};

module.exports = {
  addDesignation,
  updateDesignation,
  getDesignation,
  deleteDesignation,
};
