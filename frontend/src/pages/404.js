import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../theme";

const LeftPanel = styled("div")`
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
    padding: 80px;
`;

const RightPanel = styled("div")`
  flex: 1 1 auto;
  display: flex;
  justify-content: end;
  align-items: right;
  overflow: hidden;
  object-fit: cover;
  width: 100%;
`;

const Container = styled("div")`
  display: flex;
  height: 100vh; /* Ensure the container fills the viewport height */
`;

const StyledButton = styled(Button)`
    background-color: ${theme.palette.primary.main};
    color: white;
    margin-top: 20px;
    &:hover {
        background-color: ${theme.palette.primary.dark};
    }
`;


function NotFound() {
  return (
    <Container>
      <LeftPanel>
        <img
          src="/assets/images/Toolit_purple_Logo.png"
          alt="Image"
          style={{ objectFit: "cover", width: "150px", margin: "0 0 20px" }}
        />

        <Typography variant="h4" gutterBottom>
          Uh oh... This page is broken
        </Typography>
        <Typography variant="h6" gutterBottom>
          Looks like we have to find the right tool to fix it.
        </Typography>
        <Typography variant="h6" gutterBottom>
          404 - Page Not Found
        </Typography>
        <StyledButton variant="contained" component={Link} to="/">
          Go back to the dashboard
        </StyledButton>
      </LeftPanel>
      <RightPanel>
        <img
          src="/assets/images/404.png"
          alt="Image"
          style={{ objectFit: "cover", minHeight: "100%", maxWidth: "70%" }}
        />
      </RightPanel>
    </Container>
  );
}

export default NotFound;
