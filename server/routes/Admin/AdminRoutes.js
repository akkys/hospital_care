const router = require("express").Router();
const {
  signup,
  signin,
  signout,
  getUsers,
  deleteUser,
  updateUser,
} = require("../../controllers/Admin/AdminAuthControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
  validateCreateUser,
} = require("../../validator/AuthValidation");

router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);

router.post("/admin/updateUser/:id", isRequestValidated, updateUser);

router.post("/admin/signout", Auth, signout);

router.get("/admin/getUsers", Auth, adminMiddleware, getUsers);

router.delete("/admin/getUsers/:id", Auth, adminMiddleware, deleteUser);

module.exports = router;
