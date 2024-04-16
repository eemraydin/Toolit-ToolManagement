const express = require("express");
const router = express.Router({ mergeParams: true });

const itemsRouter = require("./items-routes");
const roomItemsRouter = require("./room-items-routes");
const roomsRouter = require("./rooms-routes");
const usersRouter = require("./users-routes");
const projectsRouter = require("./projects-routes");
const issuesRouter = require("./issues-routes");

router.use(
  itemsRouter,
  roomItemsRouter,
  roomsRouter,
  usersRouter,
  projectsRouter,
  issuesRouter
);

module.exports = router;
