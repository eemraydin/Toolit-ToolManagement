import React from "react";
import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";

import { fetchProjects } from "../services/projectsApi";
import ProjectCard from "../components/elements/cards/ProjectCard";
import Card from "../components/elements/cards/Card";
import Button from "../components/elements/buttons/Button";
import theme from "../theme";

const StyledContainer = styled("div")`
  width: 100%;
`;

const StyledSection = styled("section")((theme) => ({
  marginBottom: "4rem",
}));

export function loader() {
  return fetchProjects();
}

const ProjectCardList = (projects, isCompleted) => {
  return (
    <Grid container>
      {projects ? (
        projects
          .filter((project) => {
            return !isCompleted == !project.datecompleted;
          })
          .map((project) => (
            <Grid key={project._id} item xs={12} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))
      ) : (
        <div>Loading...</div>
      )}
    </Grid>
  );
};

const Projects = () => {
  const projects = useLoaderData();

  return (
    <StyledContainer>
      <StyledSection>
        <div className="flexContainer">
          <Typography variant="h2">Projects</Typography>
          <Button to={"/projects/new"}>Add New Project</Button>
        </div>
        <Card>
          <Typography variant="h2">Active</Typography>
          {ProjectCardList(projects, false)}
        </Card>
      </StyledSection>
      <StyledSection>
        <Card>
          <Typography variant="h2" style={{ color: "#216342" }}>
            Completed
          </Typography>
          {ProjectCardList(projects, true)}
        </Card>
      </StyledSection>
      <Outlet />
    </StyledContainer>
  );
};

export default Projects;
