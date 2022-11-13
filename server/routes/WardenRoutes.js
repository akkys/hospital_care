const router = require("express").Router();
const {
  addWarden,
  updateWarden,
  getAllWarden,
  getWarden,
  deleteWarden,
} = require("../controllers/WardenControllers");
const { Auth } = require("../util");
const {
  validateWarden,
  isRequestValidated,
} = require("../validator/FormValidation");

router.get("/warden/", getAllWarden);

router.post("/warden/add", Auth, validateWarden, isRequestValidated, addWarden);

router.post(
  "/warden/update/:id",
  Auth,
  validateWarden,
  isRequestValidated,
  updateWarden
);

router.delete("/warden/:id", Auth, deleteWarden);

module.exports = router;
