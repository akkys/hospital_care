const router = require("express").Router();
const {
  updatePatient,
  getAllPatients,
  getPatient,
  addPatient,
  deletePatient,
} = require("../controllers/PatientControllers");
const { Auth } = require("../util");
const {
  validatePatient,
  isRequestValidated,
} = require("../validator/FormValidation");

router.get("/patients/", Auth, getAllPatients);

router.get("/patients/:id", Auth, getPatient);

router.post(
  "/patients/add",
  Auth,
  validatePatient,
  isRequestValidated,
  addPatient
);

router.post(
  "/patients/update/:id",
  Auth,
  validatePatient,
  isRequestValidated,
  updatePatient
);

router.delete("/patients/:id", Auth, deletePatient);

module.exports = router;
