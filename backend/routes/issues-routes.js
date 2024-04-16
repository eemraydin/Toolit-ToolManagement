const express = require("express");
const router = express.Router();

const issuesCtrl = require("../controllers/issues-controller");

router.get("/issues/:issueId", issuesCtrl.getIssues); // return with item info

router.get("/issues", issuesCtrl.getIssues); // return with item info

router.post("/issues", issuesCtrl.createIssue);

router.patch("/issues/:issueId", issuesCtrl.updateIssue);

router.delete("/issues/:issueId", issuesCtrl.deleteIssue);

router.delete("/issues/delete/:issueId", issuesCtrl.hardDeleteIssue);

module.exports = router;
