const router = require("express").Router();
const {
  addEmp,
  updateEmp,
  getAllEmps,
  getEmps,
  deleteEmps,
} = require("../../controllers/Admin/EmployeeControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateEmployee,
  isRequestValidated,
} = require("../../validator/FormValidation");

router.get("/admin/employee/", getAllEmps);

router.get("/admin/employee/:id", getEmps);

router.post(
  "/admin/employee/add",
  Auth,
  adminMiddleware,
  validateEmployee,
  isRequestValidated,
  addEmp
);

router.delete("/admin/employee/:id", Auth, adminMiddleware, deleteEmps);

router.post(
  "/admin/employee/update/:id",
  Auth,
  adminMiddleware,
  validateEmployee,
  isRequestValidated,
  updateEmp
);

module.exports = router;
