import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import CardElement from "./Card";
import ImageIcon from "./ImageIcon";
import CustomModal from "../dialogs/CustomModal";
import TeamMemberForm from "../../forms/TeamMemberForm";

const StyledCardElement = styled(CardElement)`
  text-align: center;
`;

const TeamMemberCard = (props) => {
  const project = props.project;
  const member = props.member;

  const [openEditMember, setOpenEditMember] = useState(false);
  const handleOpenEditMember = () => setOpenEditMember(true);
  const handleCloseEditMember = () => setOpenEditMember(false);

  return (
    <StyledCardElement>
      {!project.datecompleted && (
        <CustomModal
          isEdit
          open={openEditMember}
          handleOpen={handleOpenEditMember}
          handleClose={handleCloseEditMember}
          description={
            <TeamMemberForm
              project={project}
              member={member}
              handleClose={handleCloseEditMember}
              handleOpen={props.handleOpen}
            />
          }
        />
      )}
      {member.image && (
        <ImageIcon
          src={member.image}
          alt={`member ${member.firstname} ${member.lastname}`}
          size="200px"
          margin="1rem auto"
        ></ImageIcon>
      )}
      <Typography variant="h4">{`${member.firstname} ${member.lastname}`}</Typography>
    </StyledCardElement>
  );
};

export default TeamMemberCard;
