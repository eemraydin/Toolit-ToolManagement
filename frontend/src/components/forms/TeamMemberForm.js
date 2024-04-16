import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

import {
  updateProjectTeam,
  updateProjectTeamMember,
} from "../../services/projectsApi";
import Button from "../elements/buttons/Button";
import Label from "../elements/label.js";
import TextInput from "../elements/textinput.js";
import UploadButton from "../elements/uploadbutton.js";

const StyledContainer = styled("div")`
  width: 100%;
`;

const StyledButtonContainer = styled("div")`
  margin-top: 2rem;
`;

const TeamMemberForm = (props) => {
  const project = props.project;
  const members = project.team && project.team.members;
  const member = props.member;
  const action = props.action ?? {
    method: "PATCH",
    redirect: `/projects/teams/${project._id}`,
  };

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const submitForm = async () => {
    const myFormData = new FormData(document.getElementById("teamMemberForm"));
    myFormData.append("file", file);

    if (!member) {
      const newMembers = members ?? [];
      newMembers.push(getValues());
      myFormData.append("members", JSON.stringify(newMembers));
    }

    try {
      if (member) {
        await updateProjectTeamMember(project._id, member._id, myFormData); // edit member
      } else {
        const isSuccess = await updateProjectTeam(project._id, myFormData); // add new member
        if (isSuccess) {
          props.handleOpen();
        }
      }
      props.handleClose();
      navigate(action.redirect);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async () => {
    const myFormData = new FormData(document.getElementById("teamMemberForm"));
    const updatedMembers = members.filter(
      (memberObj) => memberObj._id != member._id
    );
    myFormData.append("members", JSON.stringify(updatedMembers));
    const isSuccess = await updateProjectTeam(project._id, myFormData); // remove member
    if (isSuccess) {
      props.handleOpen();
    }
  };

  return (
    <StyledContainer>
      <form
        id="teamMemberForm"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit(submitForm)}
      >
        {member && (
          <CancelIcon
            onClick={() => {
              props.handleClose
                ? props.handleClose()
                : navigate(action.redirect);
            }}
            sx={{ display: "block", ml: "auto" }}
          />
        )}
        <Label htmlFor="image">Upload Photo</Label>
        <UploadButton file={file} setFile={setFile} imageUrl={imageUrl} />
        <Label htmlFor="firstname">First Name*</Label>
        <TextInput
          id="firstname"
          name="firstname"
          placeholder="First name of member"
          defaultValue={member && member.firstname}
          {...register("firstname")}
          required
        />
        <Label htmlFor="lastname">Last Name*</Label>
        <TextInput
          id="lastname"
          name="lastname"
          placeholder="Last name of member"
          defaultValue={member && member.lastname}
          {...register("lastname")}
          required
        />
        <StyledButtonContainer>
          {member ? (
            <>
              <Button type="submit" green children={"Save Changes"} />
              <Button
                type="submit"
                red
                left
                green
                children={"Remove"}
                onClick={handleRemove}
              />
            </>
          ) : (
            <>
              <Button type="submit" green children={"Save"} />
              <Button
                type="reset"
                red
                left
                children={"Cancel"}
                onClick={() => {
                  props.handleClose
                    ? props.handleClose()
                    : navigate(action.redirect);
                }}
              />
            </>
          )}
        </StyledButtonContainer>
      </form>
    </StyledContainer>
  );
};

export default TeamMemberForm;
