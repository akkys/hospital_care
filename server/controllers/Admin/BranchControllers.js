let Branch = require("../../models/Admin/BranchModel");

const addBranch = async (req, res) => {
  try {
    const { email, contact, address, helpLine } = req.body;

    const newBranch = new Branch({
      email,
      contact,
      address,
      helpLine,
      userId: req.user,
    });

    const savedBranch = await newBranch.save();
    res.json(savedBranch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBranch = async (req, res) => {
  try {
    const branchData = await Branch.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (branchData) {
      branchData.email = req.body.email;
      branchData.contact = req.body.contact;
      branchData.address = req.body.address;
      branchData.helpLine = req.body.helpLine;
    }

    const updatedBranch = await branchData.save();
    res.json(updatedBranch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBranch = async (req, res) => {
  const branchData = await Branch.find();
  res.json(branchData);
};

const deleteBranch = async (req, res) => {
  const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
  res.json(deletedBranch);
};

module.exports = {
  addBranch,
  updateBranch,
  getBranch,
  deleteBranch,
};
