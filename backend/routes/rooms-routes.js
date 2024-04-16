const express = require("express");
const router = express.Router();

const roomsCtrl = require("../controllers/rooms-controller");

router.get("/rooms/:roomId", roomsCtrl.getRooms); // return with room items (+ item) info

router.get("/rooms", roomsCtrl.getRooms); // return with room items info

router.post("/rooms", roomsCtrl.createRoom);

router.patch("/rooms/:roomId", roomsCtrl.updateRoom);

router.delete("/rooms/:roomId", roomsCtrl.deleteRoom);

module.exports = router;
