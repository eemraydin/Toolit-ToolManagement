import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

import { createRoom } from "../../services/roomsApi";
import CardElement from "../elements/cards/Card";
import Button from "../elements/buttons/Button";
import Label from "../elements/label.js";
import TextInput from "../elements/textinput.js";
import UploadButton from "../elements/uploadbutton.js";
import TimePickerInput from "../elements/inputs/TimePickerInput.js";

const StyledButtonContainer = styled("div")`
  margin-top: 3rem;
`;

const StyledP = styled("p")`
  color: #a72525;
  margin: 0;
`;

const RoomForm = () => {
  const navigate = useNavigate();
  const action = {
    buttonLabel: "Add New Room",
    innerButtonLabel: "Add Room",
    method: "POST",
    redirect: "/rooms/",
  };

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [openingTime, setOpeningTime] = useState(null);
  const [closingTime, setClosingTime] = useState(null);
  const [error, setError] = useState(null);

  const handleOpeningTime = (e) => {
    setOpeningTime(e);
    if (closingTime && e >= closingTime) {
      setError("Invalid hours");
    } else {
      setError();
    }
  };

  const handleClosingTime = (e) => {
    setClosingTime(e);
    if (openingTime && e <= openingTime) {
      setError("Invalid hours");
    } else {
      setError();
    }
  };

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
    if (error) {
      return;
    }
    const myFormData = new FormData(document.getElementById("roomForm"));
    myFormData.append("file", file);
    try {
      // TODO: loader for createRoom
      await createRoom(myFormData);
      navigate("/rooms/");
    } catch (err) {}
  };

  return (
    <>
      <Typography variant="h2">Rooms</Typography>
      <CardElement>
        <form
          id="roomForm"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(submitForm)}
        >
          <h2>{action.buttonLabel}</h2>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={4}>
              <Label htmlFor="name">Name*</Label>
              <TextInput
                id="name"
                name="name"
                placeholder="Name of room"
                {...register("name")}
                required
              />

              <Grid container columnSpacing={4}>
                <Grid item xs={6} md={6}>
                  <Label htmlFor="hours">Opening Hours</Label>
                  <TimePickerInput
                    id="openinghours"
                    name="openinghours"
                    onAccept={(e) => handleOpeningTime(e)}
                  />
                </Grid>

                <Grid item xs={6} md={6}>
                  <Label htmlFor="hours">Closing Hours</Label>
                  <TimePickerInput
                    id="closinghours"
                    name="closinghours"
                    value={closingTime ?? openingTime}
                    onAccept={(e) => handleClosingTime(e)}
                    minTime={
                      openingTime &&
                      dayjs()
                        .set("hour", openingTime.$H)
                        .set("minute", Number(openingTime.$m) + 30)
                        .startOf("minute")
                    }
                    error={error}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Label htmlFor="description">Description</Label>
              <TextInput
                id="description"
                name="description"
                placeholder={"Describe the room \n(Max characters: 300)"}
                multiline
                rows={4}
                {...register("description", {
                  maxLength: {
                    value: 300,
                    message: "Please describe within 300 characters.",
                  },
                })}
              />
              {errors.description && (
                <StyledP>{errors.description.message}</StyledP>
              )}
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

export default RoomForm;
