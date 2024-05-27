var express = require("express");
var router = express.Router();
const CollectorsController = require("../controllers/CollectorsController");
const multer = require("../middlewares/multer");
router.get("/addCollector", CollectorsController.showFormAddCollector);
router.post(
  "/addCollector",
  multer("profiles"),
  CollectorsController.addCollector
);

router.get("/login", CollectorsController.showLogin);
router.post("/login", CollectorsController.login);
module.exports = router;
