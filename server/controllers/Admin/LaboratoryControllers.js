let LabRooms = require("../../models/Admin/LaboratoryModel");

const addLabRoom = async (req, res) => {
  try {
    const { num, name, capacity, groups, fromTime, toTime } = req.body;

    const newLabRoom = new LabRooms({
      num,
      name,
      capacity,
      groups,
      fromTime,
      toTime,
      userId: req.user,
    });

    const savedLabRooms = await newLabRoom.save();
    res.json(savedLabRooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLabRoom = async (req, res) => {
  try {
    const labRoomData = await LabRooms.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (labRoomData) {
      labRoomData.num = req.body.num;
      labRoomData.name = req.body.name;
      labRoomData.capacity = req.body.capacity;
      labRoomData.groups = req.body.groups;
      labRoomData.fromTime = req.body.fromTime;
      labRoomData.toTime = req.body.toTime;
    }

    const updatedLabRooms = await labRoomData.save();
    res.json(updatedLabRooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllLabRooms = async (req, res) => {
  const roomData = await LabRooms.find();
  res.json(roomData);
};

const getLabRoom = async (req, res) => {
  const roomData = await LabRooms.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(roomData);
};

const deleteLabRoom = async (req, res) => {
  const deletedRoom = await LabRooms.findByIdAndDelete(req.params.id);
  res.json(deletedRoom);
};

module.exports = {
  addLabRoom,
  updateLabRoom,
  getAllLabRooms,
  getLabRoom,
  deleteLabRoom,
};
