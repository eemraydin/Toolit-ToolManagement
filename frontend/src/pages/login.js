import React, { useState } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
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
import { mobile } from "../responsive";
import { newRequest } from "../services/api";
import theme from "../theme";
import Typography from "@mui/material";




const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  }));

const LeftPanel = styled("div")(({ theme }) => ({
  width: "50%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));


const RightPanel = styled("div")(({ theme }) => ({
  width: "50%",
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
  padding: "20px",
  flexDirection: "column",
  }));


const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  }));

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  width: "100%",
  }));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#342c62",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#342c62",
  },
  }));

const Img = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));


const SignupP = styled("p")(({ theme }) => ({
  marginTop: "20px",
  fontSize: "14px",
  textAlign: "center",
  a: {
    color: "#342c62",
    textDecoration: "none",
  },  
  }));


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await newRequest.post("/users/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err);
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

              <Form>
                <Input
                  fullWidth
                  label="Email"
                  id="email"
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
                    id="password"
                    type={showPassword ? "text" : "password"}
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

                {error && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    Invalid email or password. Please try again.
                  </p>
                )}
                <p style={{textAlign:"right"}}>Forgot Password?</p>
                <LoginButton variant="contained" onClick={handleSubmit}>
                  Login
                </LoginButton>
              </Form>
              <SignupP>
                Don't have an account?{" "}
                <Link to="/signup" style={{ fontWeight: "700" }}>
                  <u>Sign Up</u>
                </Link>
              </SignupP>
            </Wrapper>
          </RightPanel>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
