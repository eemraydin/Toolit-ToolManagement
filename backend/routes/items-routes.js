const express = require("express");
const router = express.Router();

const itemsCtrl = require("../controllers/items-controller");

router.get("/items/search", itemsCtrl.searchItems); // url: /items/search?q=keyword

router.get("/items/:itemId", itemsCtrl.getItems); // return item with room items (+ rooms) info

router.get("/items", itemsCtrl.getItems); // return item with room items info

router.post("/items", itemsCtrl.createItem);

router.patch("/items/:itemId", itemsCtrl.updateItem);

router.patch("/items/receive/:itemId", itemsCtrl.receiveItem);

router.patch("/items/recount/:itemId", itemsCtrl.recountItem);

router.patch("/items/reserve/:roomItemId", itemsCtrl.reserveItem);

router.patch("/items/reportItem/:issueId", itemsCtrl.reportItem);

router.patch("/items/deactivate/:itemId", itemsCtrl.deactivateItem);

router.delete("/items/:itemId", itemsCtrl.deleteItem);

module.exports = router;
