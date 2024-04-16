import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

import { fetchProjectById } from "../services/projectsApi";
import Button from "../components/elements/buttons/Button";
import CustomModal from "../components/elements/dialogs/CustomModal";
import SuccessSnackbar from "../components/elements/dialogs/SuccessSnackbar";
import CardElement from "../components/elements/cards/Card";
import TeamMemberCard from "../components/elements/cards/TeamMemberCard";
import EditNameForm from "../components/forms/EditNameForm";
import TeamMemberForm from "../components/forms/TeamMemberForm";

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

const ProjectTeam = () => {
  const project = useLoaderData();
  const team = project && project.team;

  const [openAddNewMember, setOpenAddNewMember] = useState(false);
  const handleOpenAddNewMember = () => setOpenAddNewMember(true);
  const handleCloseAddNewMember = () => setOpenAddNewMember(false);

  const [openEditTeamName, setOpenEditTeamName] = useState(false);
  const handleOpenEditTeamName = () => setOpenEditTeamName(true);
  const handleCloseEditTeamName = () => setOpenEditTeamName(false);

  const [openAddMemberSuccess, setOpenAddMemberSuccess] = useState(false);
  const handleOpenAddMemberSuccess = () => setOpenAddMemberSuccess(true);
  const handleCloseAddMemberSuccess = (event, reason) => {
    if (reason != "clickaway") setOpenAddMemberSuccess(false);
  };

  const [openRemoveMemberSuccess, setOpenRemoveMemberSuccess] = useState(false);
  const handleOpenRemoveMemberSuccess = () => setOpenRemoveMemberSuccess(true);
  const handleCloseRemoveMemberSuccess = (event, reason) => {
    if (reason != "clickaway") setOpenRemoveMemberSuccess(false);
  };

  return (
    <StyledContainer>
      <div className="flexContainer">
        <Typography variant="h2">Project</Typography>
        {!project.datecompleted && (
          <CustomModal
            buttonName="Add New Member"
            open={openAddNewMember}
            handleOpen={handleOpenAddNewMember}
            handleClose={handleCloseAddNewMember}
            description={
              <TeamMemberForm
                project={project}
                handleClose={handleCloseAddNewMember}
                handleOpen={handleOpenAddMemberSuccess}
              />
            }
          />
        )}
        <SuccessSnackbar
          open={openAddMemberSuccess}
          onClose={handleCloseAddMemberSuccess}
          message="New team member added"
        />
      </div>
      <CardElement>
        <div className="flexContainerLeft">
          <StyledH2>Team: {team && team.teamname}</StyledH2>
          {!project.datecompleted && (
            <CustomModal
              isEdit
              open={openEditTeamName}
              handleOpen={handleOpenEditTeamName}
              handleClose={handleCloseEditTeamName}
              description={
                <EditNameForm
                  type="team"
                  project={project}
                  handleClose={handleCloseEditTeamName}
                />
              }
            />
          )}
        </div>
        {team && (
          <Grid container spacing={4}>
            {team.members ? (
              team.members.map((member) => (
                <Grid key={member._id} item xs={12} md={4}>
                  <TeamMemberCard
                    project={project}
                    member={member}
                    handleOpen={handleOpenRemoveMemberSuccess}
                  />
                </Grid>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
        )}
        <SuccessSnackbar
          open={openRemoveMemberSuccess}
          onClose={handleCloseRemoveMemberSuccess}
          message="Team member removed"
        />
        <Button gray left to={`/projects/${project._id}/`}>
          Back
        </Button>
      </CardElement>
    </StyledContainer>
  );
};

export default ProjectTeam;
