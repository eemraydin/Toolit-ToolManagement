import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { FormControl } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../services/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  }));


const LeftPanel = styled("div")(({ theme }) => ({
  width: "40%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));


const RightPanel = styled("div")(({ theme }) => ({
  width: "60%",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));


const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "60%",
  maxWidth: "400px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  }));


const Title = styled("h1")(({ theme }) => ({
  fontSize: 24,
  fontWeight: 300,
  }));
const Form = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  }));
const Input = styled(TextField)(({ theme }) => ({
  flex: 1,
  minWidth: "40%",
  marginBottom: 20,
  }));
const SignUpButton = styled(Button)(({ theme }) => ({
  marginTop: 20,
  backgroundColor: "#342c62",
  }));
const Img = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "100%",
  objectFit: "cover",
  }));
const Login = styled("p")(({ theme }) => ({
  marginTop: 20,
  fontSize: 14,
  textAlign: "center",
  a: {
    color: "#342c62",

    textDecoration: "none",
  },
  }));
const ErrorMessage = styled("div")(({ theme }) => ({
  color: "red",
  marginTop: 10,
  }));

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const res = await newRequest.post("/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      navigate("/");
      setError(null); 
    } catch (err) {
      setError("An error occurred during signup");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container>
        <LeftPanel>
          <Img src="/assets/images/Login-Signup.png" alt="" />
        </LeftPanel>
        <RightPanel>
          <Wrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "50px",
              }}
            >
              <img
                style={{ maxWidth: "140px" }}
                src="/assets/images/Toolit_purple_Logo.png"
                alt=""
              />
              <h2>Welcome to Toolit</h2>
            </div>
            <Title>Sign Up</Title>
            <Form>
              <Input
                fullWidth
                label="Name"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
              <Input
                fullWidth
                label="Email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />

              <FormControl
                sx={{ marginBottom: "20px", width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password-first"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <FormControl
                sx={{ marginBottom: "20px", width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="password-confirm"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>

              <SignUpButton
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Sign Up
              </SignUpButton>
            </Form>
            <Login>
              Already have an account?{" "}
              <Link to="/login" style={{fontWeight:"700"}}>
                <u>Login</u>
              </Link>
            </Login>
            <ErrorMessage>{error}</ErrorMessage>
          </Wrapper>
        </RightPanel>
      </Container>
      </ThemeProvider>
    </>
  );
}

export default Signup;
