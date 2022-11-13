const Docs = require("../../models/Admin/DoctorModel");

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      gender,
      expert,
      desc,
      time,
      available,
      exp,
      contact,
      qualification,
    } = req.body;

    const newDocs = new Docs({
      name,
      gender,
      expert,
      desc,
      time,
      available,
      exp,
      contact,
      qualification,
      userId: req.user,
    });

    const savedDocs = await newDocs.save();
    res.json(savedDocs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const docsData = await Docs.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (docsData) {
      docsData.name = req.body.name;
      docsData.gender = req.body.gender;
      docsData.expert = req.body.expert;
      docsData.desc = req.body.desc;
      docsData.time = req.body.time;
      docsData.available = req.body.available;
      docsData.exp = req.body.exp;
      docsData.contact = req.body.contact;
      docsData.qualification = req.body.qualification;
    }

    const updatedDocs = await docsData.save();
    res.json(updatedDocs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDoctors = async (req, res) => {
  const docsData = await Docs.find();
  res.json(docsData);
};

const getDoctor = async (req, res) => {
  const docsData = await Docs.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(docsData);
};

const deleteDoctor = async (req, res) => {
  const deletedDocs = await Docs.findByIdAndDelete(req.params.id);
  res.json(deletedDocs);
};

module.exports = {
  addDoctor,
  updateDoctor,
  getAllDoctors,
  getDoctor,
  deleteDoctor,
};
