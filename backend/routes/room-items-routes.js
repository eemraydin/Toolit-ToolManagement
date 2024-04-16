const express = require("express");
const router = express.Router();

const roomItemsCtrl = require("../controllers/room-items-controller");

router.get("/roomitems/:roomItemId", roomItemsCtrl.getRoomItem); // return with room and item (+ other room items) info

router.post("/roomitems", roomItemsCtrl.createRoomItem);

router.patch("/roomitems/:roomItemId", roomItemsCtrl.updateRoomItem);

router.delete("/roomitems/:roomItemId", roomItemsCtrl.deleteRoomItem);

module.exports = router;
