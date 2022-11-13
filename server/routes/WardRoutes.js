const router = require("express").Router();
const {
  getAllWards,
  addWard,
  updateWard,
  deleteWard,
} = require("../controllers/WardControllers");
const { Auth } = require("../util");
const {
  validateWard,
  isRequestValidated,
} = require("../validator/FormValidation");

router.get("/wards/", getAllWards);

router.post("/wards/add", Auth, validateWard, isRequestValidated, addWard);

router.post(
  "/wards/update/:id",
  Auth,
  validateWard,
  isRequestValidated,
  updateWard
);

router.delete("/wards/:id", Auth, deleteWard);

module.exports = router;
