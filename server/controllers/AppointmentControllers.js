let Appointment = require("../models/AppointmentModel");

const addAppt = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      address,
      city,
      zipcode,
      date,
      reason,
      docName,
      fromTime,
      toTime,
      department,
      status,
    } = req.body;

    const newAppointment = new Appointment({
      name,
      email,
      contact,
      address,
      city,
      zipcode,
      date,
      reason,
      docName,
      fromTime,
      toTime,
      department,
      status,
      userId: req.user,
    });

    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAppt = async (req, res) => {
  try {
    const appointmentData = await Appointment.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (appointmentData) {
      appointmentData.name = req.body.name;
      appointmentData.email = req.body.email;
      appointmentData.contact = req.body.contact;
      appointmentData.address = req.body.address;
      appointmentData.city = req.body.city;
      appointmentData.zipcode = req.body.zipcode;
      appointmentData.date = req.body.date;
      appointmentData.reason = req.body.reason;
      appointmentData.docName = req.body.docName;
      appointmentData.fromTime = req.body.fromTime;
      appointmentData.toTime = req.body.toTime;
      appointmentData.department = req.body.department;
      appointmentData.status = req.body.status;
    }

    const updatedAppointment = await appointmentData.save();
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAppt = async (req, res) => {
  const appointmentData = await Appointment.find();
  res.json(appointmentData);
};

const getAppt = async (req, res) => {
  const appointmentData = await Appointment.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(appointmentData);
};

const deleteAppt = async (req, res) => {
  const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
  res.json(deletedAppointment);
};

module.exports = {
  addAppt,
  updateAppt,
  getAllAppt,
  getAppt,
  deleteAppt,
};
