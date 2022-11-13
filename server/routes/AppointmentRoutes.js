const router = require("express").Router();
const {
  addAppt,
  updateAppt,
  getAllAppt,
  getAppt,
  deleteAppt,
} = require("../controllers/AppointmentControllers");
const { Auth } = require("../util");
const {
  validateAppointment,
  isRequestValidated,
} = require("../validator/FormValidation");

router.post(
  "/appointments/add",
  Auth,
  validateAppointment,
  isRequestValidated,
  addAppt
);

router.post(
  "/appointments/update/:id",
  Auth,
  validateAppointment,
  isRequestValidated,
  updateAppt
);

router.get("/appointments/", Auth, getAllAppt);

router.get("/appointments/:id", Auth, getAppt);

router.delete("/appointments/:id", Auth, deleteAppt);

module.exports = router;
