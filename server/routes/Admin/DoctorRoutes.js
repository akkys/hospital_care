const router = require("express").Router();
const {
  getAllDoctors,
  getDoctor,
  addDoctor,
  deleteDoctor,
  updateDoctor,
} = require("../../controllers/Admin/DoctorControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateDoctor,
  isRequestValidated,
} = require("../../validator/FormValidation");

router.get("/admin/doctors/", getAllDoctors);

router.get("/admin/doctors/:id", getDoctor);

router.post(
  "/admin/doctors/add",
  Auth,
  adminMiddleware,
  validateDoctor,
  isRequestValidated,
  addDoctor
);

router.delete("/admin/doctors/:id", Auth, adminMiddleware, deleteDoctor);

router.post(
  "/admin/doctors/update/:id",
  Auth,
  adminMiddleware,
  validateDoctor,
  isRequestValidated,
  updateDoctor
);

module.exports = router;
