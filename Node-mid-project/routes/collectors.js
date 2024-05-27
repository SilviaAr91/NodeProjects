const express = require("express");
const router = express.Router();
const CollectorsController = require("../controllers/CollectorsController");
const itemsController = require("../controllers/itemsController");
const multer = require("../middlewares/multer");


router.get("/:id", CollectorsController.getAllItemsFromCollector);


router.post("/:id/addItem", multer("items"), itemsController.addItem);


router.get("/:collectorId/formEditItem/:itemId", itemsController.showEditItem);


router.post("/:collectorId/editItem/:itemId", itemsController.editItem);

router.get("/:collectorId/deleteItem/:itemId", itemsController.deleteItem);

router.get("/search", itemsController.searchItem);

//router.get("/login", CollectorsController.showLogin);
//router.post("/login", CollectorsController.login);

module.exports = router;