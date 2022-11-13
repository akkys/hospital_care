const Warden = require("../models/WardenModal");

const addWarden = async (req, res) => {
  try {
    const { name, empId, dob, joinDate, bloodGroup, contact, gender } =
      req.body;

    const newWarden = new Warden({
      name,

      empId,
      dob,
      joinDate,
      bloodGroup,
      contact,
      gender,
      userId: req.user,
    });

    const savedWarden = await newWarden.save();
    res.json(savedWarden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateWarden = async (req, res) => {
  try {
    const wardenData = await Warden.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (wardenData) {
      wardenData.name = req.body.name;
      wardenData.empId = req.body.empId;
      wardenData.dob = req.body.dob;
      wardenData.joinDate = req.body.joinDate;
      wardenData.bloodGroup = req.body.bloodGroup;
      wardenData.contact = req.body.contact;
      wardenData.gender = req.body.gender;
    }

    const updatedWarden = await wardenData.save();
    res.json(updatedWarden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllWarden = async (req, res) => {
  const wardenData = await Warden.find({});
  res.json(wardenData);
};

const getWarden = async (req, res) => {
  const wardenData = await Warden.findById({
    userId: req.user,
    _id: req.params.id,
  });

  res.json(wardenData);
};

const deleteWarden = async (req, res) => {
  const deletedWarden = await Warden.findByIdAndDelete(req.params.id);
  res.json(deletedWarden);
};

module.exports = {
  addWarden,
  updateWarden,
  getAllWarden,
  getWarden,
  deleteWarden,
};
