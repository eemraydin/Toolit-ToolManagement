const mongoose = require("mongoose");
const Room = require("../models/room");
Project = require("../models/project");
const { storeImage } = require("../utils/storage");

const getProjects = async (req, res) => {
  const id = req.params.projectId;

  if (typeof id == "undefined") {
    await Project.find({})
      .populate({
        path: "roomId",
        populate: { path: "roomitems" },
      })
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json(err);
        return;
      });
  } else {
    await Project.findOne({ _id: id })
      .populate({
        path: "roomId",
        populate: {
          path: "roomitems",
          populate: {
            path: "item",
            model: "Item",
          },
        },
      })
      .exec()
      .then((results) => {
        res.status(results == null ? 404 : 200).json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

const createProject = async (req, res) => {
  let project = new Project(req.body);
  let roomObj;

  try {
    const { roomId } = req.body;
    roomObj = await Room.findById(roomId);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!roomObj) {
    res.status(404).json(roomObj);
    return;
  }

  if (req.files) {
    await storeImage(req.files.file, "projects")
      .then((result) => {
        project.image = result.Location;
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  await project
    .save()
    .then((results) => {
      if (results == null) {
        res.status(404).json(results);
      } else {
        updateRoom(roomObj, results._id);
        res.status(201).json({ url: req.originalUrl, data: results });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const updateProject = async (req, res) => {
  const { name, roomId, datecompleted, completed } = req.body;

  const id = req.params.projectId;
  let project;

  try {
    project = await Project.findById(id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!project) {
    res.status(404).json(project);
    return;
  }

  if (req.files) {
    await storeImage(req.files.file, "projects")
      .then((result) => {
        project.image = result.Location;
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  try {
    project.name = name ?? project.name;
    project.roomId = roomId ?? project.roomId;
    project.datecompleted = datecompleted ?? project.datecompleted;
    project.completed = completed ?? project.completed;

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await project.save({ session: sess });

    if (roomId) {
      roomObj = await Room.findById(roomId);
      if (!roomObj || !roomObj.project) {
        res.status(404).json(roomObj);
        return;
      }
      if (!datecompleted || roomObj.project.equals(project._id)) {
        const projectId = datecompleted ? null : project._id;
        await updateRoom(roomObj, projectId);
      }
    }

    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const updateRoom = async (roomObj, projectId) => {
  try {
    roomObj.project = projectId;
    await roomObj.save();
  } catch (err) {
    console.log(err);
    return;
  }
};

const updateProjectTeam = async (req, res) => {
  const { teamname, members } = req.body;
  const memberArr = members ? JSON.parse(members) : null;
  const id = req.params.projectId;
  let project;

  try {
    project = await Project.findById(id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!project) {
    res.status(404).json(project);
    return;
  }

  if (req.files && memberArr && memberArr.length > 0) {
    await storeImage(req.files.file, "members")
      .then((result) => {
        memberArr[memberArr.length - 1].image = result.Location;
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  try {
    if (!project.team) {
      project.team = {};
    }
    if (!project.team.members) {
      project.team.members = [];
    }
    project.team.teamname = teamname ?? project.team.teamname;
    // project.team.members =
    //   removeDuplicatedMembers(members) ?? project.team.members;
    project.team.members = memberArr ?? project.team.members;

    await project.save();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const updateProjectTeamMember = async (req, res) => {
  const { firstname, lastname } = req.body;
  const projectId = req.params.projectId;
  const memberId = req.params.memberId;

  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!project || !project.team || !project.team.members) {
    res.status(404).json(project);
    return;
  }

  for (const member of project.team.members) {
    if (member._id == memberId) {
      member.firstname = firstname ?? member.firstname;
      member.lastname = lastname ?? member.lastname;
      if (req.files) {
        await storeImage(req.files.file, "members")
          .then((result) => {
            member.image = result.Location;
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
      break;
    }
  }

  try {
    // let tempMembers = removeDuplicatedMembers(project.team.members);
    // project.team.members = tempMembers ?? project.team.members;

    await project.save();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const removeDuplicatedMembers = (members) => {
  const tempMembers =
    members &&
    members.reduce((acc, current) => {
      if (
        !acc.find(
          (member) =>
            member.firstname === current.firstname &&
            member.lastname === current.lastname
        )
      ) {
        acc.push(current);
      }
      return acc;
    }, []);

  return tempMembers;
};

const deleteProject = async (req, res) => {
  const id = req.params.projectId;

  let project;
  try {
    project = await Project.findById(id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!project) {
    res.status(404).json(project);
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    // delete project and project id in room
    if (project.roomId) {
      let room = await Room.findById(project.roomId);
      room.project = null;
      room.save({ session: sess });
    }

    await project.deleteOne({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  res.status(200).json({ message: "Deleted project." });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  updateProjectTeam,
  updateProjectTeamMember,
  deleteProject,
};
