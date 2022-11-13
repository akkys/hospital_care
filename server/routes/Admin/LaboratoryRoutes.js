const router = require("express").Router();
const {
  addLabRoom,
  updateLabRoom,
  getAllLabRooms,
  getLabRoom,
  deleteLabRoom,
} = require("../../controllers/Admin/LaboratoryControllers");
const { Auth, adminMiddleware } = require("../../util");
const {
  validateLabRoom,
  isRequestValidated,
} = require("../../validator/FormValidation");

router.get("/admin/labRooms/", getAllLabRooms);

router.get("/admin/labRooms/:id", getLabRoom);

router.post(
  "/admin/labRooms/add",
  Auth,
  adminMiddleware,
  validateLabRoom,
  isRequestValidated,
  addLabRoom
);

router.post(
  "/admin/labRooms/update/:id",
  Auth,
  adminMiddleware,
  validateLabRoom,
  isRequestValidated,
  updateLabRoom
);

router.delete("/admin/labRooms/:id", Auth, adminMiddleware, deleteLabRoom);

module.exports = router;
