import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

import { fetchProjectById, updateProject } from "../services/projectsApi";
import Button from "../components/elements/buttons/Button";
import CustomModal from "../components/elements/dialogs/CustomModal";
import EditNameForm from "../components/forms/EditNameForm";
import SuccessSnackbar from "../components/elements/dialogs/SuccessSnackbar";
import CardElement from "../components/elements/cards/Card";
import ImageCard from "../components/elements/cards/ImageCard";
import ImageIcon from "../components/elements/cards/ImageIcon";
import ChildCard from "../components/elements/cards/ChildCard";
import RoomItemListCard from "../components/elements/cards/RoomItemListCard";

const StyledContainer = styled("div")`
  width: 100%;
`;

const StyledH2 = styled("h2")`
  font-style: italic;
  margin-top: 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

export function loader({ params }) {
  return fetchProjectById(params.id);
}

const Project = () => {
  const project = useLoaderData();
  const navigate = useNavigate();

  const [openEditProjectName, setOpenEditProjectName] = useState(false);
  const handleOpenEditProjectName = () => setOpenEditProjectName(true);
  const handleCloseEditProjectName = () => setOpenEditProjectName(false);

  const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);
  const [openCompleteSuccess, setOpenCompleteSuccess] = useState(false);
  const handleOpenCompleteSuccess = () => setOpenCompleteSuccess(true);
  const handleCloseCompleteSuccess = (event, reason) => {
    if (reason != "clickaway") setOpenCompleteSuccess(false);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleMarkAsDone = async () => {
    if (project.datecompleted) {
      return;
    }
    project.datecompleted = new Date();
    const isSuccess = await updateProject(project._id, project);
    if (isSuccess) {
      setIsMarkedAsDone(true);
      handleOpenCompleteSuccess();
      await sleep(3000);
      navigate("/projects");
    }
  };

  return (
    <StyledContainer>
      <div className="flexContainer">
        <Typography variant="h2">Project</Typography>
        <Button onClick={handleMarkAsDone} disabled={project.datecompleted}>
          Mark As Done
        </Button>
        <SuccessSnackbar
          open={openCompleteSuccess}
          onClose={handleCloseCompleteSuccess}
          message="Project completed"
        />
      </div>
      <CardElement>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <div className="flexContainerLeft">
              <StyledH2>{project.name}</StyledH2>
              {!project.datecompleted && (
                <CustomModal
                  isEdit
                  open={openEditProjectName}
                  handleOpen={handleOpenEditProjectName}
                  handleClose={handleCloseEditProjectName}
                  description={
                    <EditNameForm
                      type="project"
                      project={project}
                      handleClose={handleCloseEditProjectName}
                    />
                  }
                />
              )}
            </div>
            {project.image && (
              <ImageCard src={project.image} alt={`project ${project.name}`} />
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <ChildCard
                  title="Room"
                  contents={[project.roomId && project.roomId.name]}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <ChildCard
                  title="Event Details"
                  contents={[
                    "April 20, 2024 Saturday",
                    "1:00PM - 4:00PM",
                    "Metro Toronto Convention Centre, Toronto",
                  ]}
                />
              </Grid>
            </Grid>
            <ChildCard
              title="Team"
              contents={[
                project.team && project.team.teamname
                  ? project.team.teamname
                  : "No team name",
                `Members: ${
                  project.team && project.team.members
                    ? project.team.members.length
                    : "0"
                }`,
                project.team && project.team.members ? (
                  project.team.members.map(
                    (member) =>
                      member.image && (
                        <ImageIcon
                          src={member.image}
                          alt={`team member ${member.firstname} ${member.lastname}`}
                          size="100px"
                          left
                        />
                      )
                  )
                ) : (
                  <ImageIcon isDefault size="100px" />
                ),
                <Button to={`/projects/teams/${project._id}`}>
                  Edit Team
                </Button>,
              ]}
              style={{ padding: "0 0 2rem 0" }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            {!project.datecompleted && (
              <RoomItemListCard
                type="project"
                key={project.roomId._id}
                room={project.roomId}
              />
            )}
          </Grid>
          <Grid item xs={12} md={12}>
            <Button gray left to="/projects/">
              Back
            </Button>
          </Grid>
        </Grid>
      </CardElement>
    </StyledContainer>
  );
};

export default Project;
