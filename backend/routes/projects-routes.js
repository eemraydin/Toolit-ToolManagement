const express = require("express");
const router = express.Router();

const projectsCtrl = require("../controllers/projects-controller");

router.get("/projects/:projectId", projectsCtrl.getProjects);

router.get("/projects", projectsCtrl.getProjects);

router.post("/projects", projectsCtrl.createProject);

router.patch(
  "/projects/:projectId/teams/:memberId",
  projectsCtrl.updateProjectTeamMember
);

router.patch("/projects/:projectId/teams", projectsCtrl.updateProjectTeam);

router.patch("/projects/:projectId", projectsCtrl.updateProject);

router.delete("/projects/:projectId", projectsCtrl.deleteProject);

module.exports = router;
