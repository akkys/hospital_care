let Wards = require("../models/WardModel");

const addWard = async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    const newWard = new Wards({
      name,
      desc,
      price,
      userId: req.user,
    });

    const savedWard = await newWard.save();
    res.json(savedWard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateWard = async (req, res) => {
  try {
    const wardData = await Wards.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (wardData) {
      wardData.name = req.body.name;
      wardData.desc = req.body.desc;
      wardData.price = req.body.price;
    }

    const updatedward = await wardData.save();
    res.json(updatedward);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllWards = async (req, res) => {
  const wardData = await Wards.find();
  res.json(wardData);
};

const deleteWard = async (req, res) => {
  const deletedWard = await Wards.findByIdAndDelete(req.params.id);
  res.json(deletedWard);
};

module.exports = { addWard, updateWard, getAllWards, deleteWard };
