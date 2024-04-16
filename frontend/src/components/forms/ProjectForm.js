import { ReactDOM, React, useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Select, MenuItem } from "@mui/material";

import { createProject } from "../../services/projectsApi";
import { fetchRooms } from "../../services/roomsApi.js";
import CardElement from "../elements/cards/Card";
import Button from "../elements/buttons/Button";
import Label from "../elements/label.js";
import TextInput from "../elements/textinput.js";
import UploadButton from "../elements/uploadbutton.js";
import theme from "../../theme.js";

const StyledButtonContainer = styled("div")`
  margin-top: 3rem;
`;

const ProjectForm = () => {
  const navigate = useNavigate();
  const action = {
    buttonLabel: "Add New Project",
    innerButtonLabel: "Add Project",
    method: "POST",
    redirect: "/projects/",
  };

  const [rooms, setRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    fetchRooms()
      .then((result) => {
        setRooms(result);
      })
      .catch((err) => {});
  }, []);

  const handleSelectedRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

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
    handleSubmit,
  } = useForm();

  const submitForm = async () => {
    const myFormData = new FormData(document.getElementById("projectForm"));
    myFormData.append("roomId", selectedRoom);
    myFormData.append("file", file);
    try {
      // TODO: loader for createProject
      await createProject(myFormData);
      navigate("/projects/");
    } catch (err) {}
  };

  return (
    <>
      <Typography variant="h2">Projects</Typography>
      <CardElement>
        <form
          id="projectForm"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(submitForm)}
        >
          <h2>{action.buttonLabel}</h2>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={4}>
              <Label htmlFor="name">Project Name*</Label>
              <TextInput
                id="name"
                name="name"
                placeholder="Name of project"
                {...register("name")}
                required
              />
              <Label htmlFor="room">Room*</Label>
              <Select
                id="room"
                value={selectedRoom}
                onChange={handleSelectedRoom}
                displayEmpty
                required
              >
                <MenuItem value="">No Room Selected</MenuItem>
                {rooms ? (
                  rooms.map(
                    (room) =>
                      !room.project && (
                        <MenuItem key={room._id} value={room._id}>
                          {room.name}
                        </MenuItem>
                      )
                  )
                ) : (
                  <div>Loading...</div>
                )}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Label htmlFor="image">Upload Photo</Label>
              <UploadButton file={file} setFile={setFile} imageUrl={imageUrl} />
            </Grid>
          </Grid>
          <StyledButtonContainer>
            <Button type="submit" children="Save" green />
            <Button
              type="reset"
              children="Cancel"
              red
              onClick={() => {
                navigate(action.redirect);
              }}
            />
          </StyledButtonContainer>
        </form>
      </CardElement>
      <Outlet />
    </>
  );
};

export default ProjectForm;
