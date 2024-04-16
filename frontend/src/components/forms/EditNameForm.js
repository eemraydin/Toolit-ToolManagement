import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";

import {
  updateProject,
  updateProjectTeam,
} from "../../services/projectsApi.js";
import { updateRoom } from "../../services/roomsApi.js";
import Button from "../elements/buttons/Button.js";
import Label from "../elements/label.js";
import TextInput from "../elements/textinput.js";

const StyledContainer = styled("div")`
  width: 100%;
`;

const StyledButtonContainer = styled("div")`
  margin-top: 2rem;
`;

const EditNameForm = (props) => {
  const project = props.project;
  const type = props.type;
  const capitalizedType = type && type.charAt(0).toUpperCase() + type.slice(1);
  const isTeam = type == "team";
  const paramName = isTeam ? type + "name" : "name";
  const name = isTeam ? project.team && project.team.teamname : project.name;
  const action =
    props.action ?? isTeam
      ? {
          method: "PATCH",
          redirect: `/projects/teams/${project._id}`,
        }
      : {
          method: "PATCH",
        };

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const submitForm = async () => {
    try {
      if (isTeam) {
        await updateProjectTeam(project._id, getValues());
      } else if (type == "project") {
        await updateProject(project._id, getValues());
      } else {
        await updateRoom(project._id, getValues());
      }
      console.log(getValues());
      props.handleClose();
      navigate(action.redirect);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(submitForm)}>
        <Label htmlFor={paramName}>{capitalizedType} Name*</Label>
        <TextInput
          id={paramName}
          name={paramName}
          defaultValue={name}
          placeholder={`Name of ${type}`}
          {...register(paramName)}
          required
        />
        <StyledButtonContainer>
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
        </StyledButtonContainer>
      </form>
    </StyledContainer>
  );
};

export default EditNameForm;
