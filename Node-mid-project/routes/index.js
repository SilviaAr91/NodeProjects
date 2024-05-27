var express = require("express");
var router = express.Router();
const indexController = require("../controllers/IndexController");

router.get("/", indexController.showHome);
module.exports = router;
