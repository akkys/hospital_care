const router = require("express").Router();
const {
  addDesignation,
  getDesignation,
  deleteDesignation,
  updateDesignation,
} = require("../../controllers/Admin/DesignationControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateName,
  isRequestValidated,
} = require("../../validator/FormValidation");
router.get("/admin/designation/", getDesignation);

router.post(
  "/admin/designation/add",
  Auth,
  adminMiddleware,
  validateName,
  isRequestValidated,
  addDesignation
);

router.post(
  "/admin/designation/update/:id",
  Auth,
  adminMiddleware,
  validateName,
  isRequestValidated,
  updateDesignation
);

router.delete(
  "/admin/designation/:id",
  Auth,
  adminMiddleware,
  deleteDesignation
);

module.exports = router;
