import { fetchData, sendData, updateData, deleteData } from "./api";

const projectsEndpoint = "projects";
const teamsEndpoint = "teams";

const fetchProjects = () => {
  return fetchData(projectsEndpoint);
};

const fetchProjectById = (projectId) => {
  return fetchData(projectsEndpoint, projectId);
};

const createProject = (projectObj) => {
  return sendData(projectsEndpoint, projectObj);
};

const updateProject = (projectId, projectObj) => {
  return updateData(projectsEndpoint, projectId, projectObj);
};

const updateProjectTeam = (projectId, teamObj) => {
  return updateData(`${projectsEndpoint}/${projectId}`, teamsEndpoint, teamObj);
};
const updateProjectTeamMember = (projectId, teamId, memberObj) => {
  return updateData(
    `${projectsEndpoint}/${projectId}`,
    `${teamsEndpoint}/${teamId}`,
    memberObj
  );
};

export {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  updateProjectTeam,
  updateProjectTeamMember,
};
