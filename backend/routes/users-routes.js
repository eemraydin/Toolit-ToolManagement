const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users-controller");
const { verifyToken } = require("./userVerify");

router.get("/users/find/:userId",verifyToken, usersCtrl.getUser);

router.post("/users/signup", usersCtrl.signup);

router.post("/users/login" , usersCtrl.login);

router.post("/users/logout", usersCtrl.logout);

router.patch("/users/:userId",verifyToken, usersCtrl.updateUser);




module.exports = router;