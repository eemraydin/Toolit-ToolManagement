import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import CardElement from "./Card";
import ImageCard from "./ImageCard";
import ChildCard from "./ChildCard";
import Button from "../buttons/Button";

const ProjectCard = (props) => {
  const project = props.project;

  return (
    <CardElement style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <Typography variant="h4" style={{ marginBottom: "0.5rem" }}>
        {project.name}
      </Typography>
      {project.image && (
        <ImageCard src={project.image} alt={`project ${project.name}`} />
      )}
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
        ]}
      />
      <ChildCard
        title="Room"
        contents={[project.roomId && project.roomId.name]}
      />
      <Button to={`/projects/${project._id}`}>See More</Button>
    </CardElement>
  );
};

export default ProjectCard;
