const router = require("express").Router();
const {
  getBranch,
  addBranch,
  updateBranch,
  deleteBranch,
} = require("../../controllers/Admin/BranchControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateBranch,
  isRequestValidated,
} = require("../../validator/FormValidation");

router.get("/admin/branches/", getBranch);

router.post(
  "/admin/branches/add",
  Auth,
  adminMiddleware,
  validateBranch,
  isRequestValidated,
  addBranch
);

router.post(
  "/admin/branches/update/:id",
  Auth,
  adminMiddleware,
  validateBranch,
  isRequestValidated,
  updateBranch
);

router.delete("/admin/branches/:id", Auth, adminMiddleware, deleteBranch);

module.exports = router;
