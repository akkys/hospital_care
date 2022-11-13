const router = require("express").Router();
const {
  addDepartment,
  getDepartment,
  deleteDepartment,
  updateDepartment,
} = require("../../controllers/Admin/DepartmentControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateName,
  isRequestValidated,
} = require("../../validator/FormValidation");

router.get("/admin/department/", getDepartment);

router.post(
  "/admin/department/add",
  Auth,
  adminMiddleware,
  validateName,
  isRequestValidated,
  addDepartment
);

router.post(
  "/admin/department/update/:id",
  Auth,
  adminMiddleware,
  validateName,
  isRequestValidated,
  updateDepartment
);

router.delete("/admin/department/:id", Auth, adminMiddleware, deleteDepartment);

module.exports = router;
