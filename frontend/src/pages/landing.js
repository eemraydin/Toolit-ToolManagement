import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth";
import { Button, Typography, ListItem } from "@mui/material";
import { styled } from "@mui/system";

import ToolIcon from "../components/icons/ToolIcon";
import StockIssuesIcon from "../components/icons/StockIssuesIcon";
import ProjectsIcon from "../components/icons/ProjectsIcon";
import DataIcon from "../components/icons/DataIcon";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    paddingTop: "100px",
  },
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto", // Enable scrolling
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "3rem",
}));

const LeftPanel = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    width: "100%",
    marginLeft: "0",
    paddingLeft: "0",
    padding: "0",
  },
  width: "65%",
  marginLeft: "10%", // Adjust the left margin as needed
  paddingLeft: "5%", // Adjust the left padding as needed
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
}));

const RightPanel = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  width: "668px",
  height: "auto",
  objectFit: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  marginLeft: "5rem",
  marginBottom: "2rem",
}));

const SubTextMobile = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    textAlign: "center",
    margin: "1rem",
    marginBottom: "2rem",
  },
}));

const SubText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  maxWidth: "650px",
  minWidth: "500px",
  textAlign: "left",
  marginBottom: "2rem",
  fontSize: "24px",
}));

const RightImage = styled("img")(({ theme }) => ({
  position: "relative",
  top: "0",
  width: "558px",
  height: "1024px",
  objectFit: "cover",
  
}));

const LogoPanel = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "50%",
    alignItems: "center",
  },

  paddingBottom: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  textAlign: "center",
}));

const Logo = styled("img")(({ theme }) => ({
  width: "200px",
  height: "auto",
}));

const StartButton = styled(Button)(({ theme }) => ({
  marginTop: "2rem",
  padding: "1rem 2rem",
  width: "358px",
  height: "40px",
  backgroundColor: theme.palette.secondary.main,
}));

const ImagePanel = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "333px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
  },
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  objectFit: "cover",
}));

const FeaturePanel = styled("div")(({ theme }) => ({
  display: "flex",
  justifyItems: "center",
  justifyContent: "space-between",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "2rem",
  height: "100%",

  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem",
    width: "100%", // Adjusted width for spacing
    textAlign: "center",
  },
}));

const Row = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  justifyItems: "center",
  alignItems: "top",
  width: "100%",
  marginBottom: "1rem",

  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "1rem",
  },
}));

const IconWrapper = styled("div")(({ theme }) => ({
  width: "95px",
  height: "95px",
  borderRadius: "50%", // Make it circular
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  marginBottom: "1rem",
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "0.5rem",
  minWidth: "200px",
  fontWeight: "700",

  [theme.breakpoints.down("md")]: {
    marginBottom: "1rem",
  },
}));

const IconTextContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginBottom: "2rem", // Increase margin for more space between items

  [theme.breakpoints.down("md")]: {
    width: "100%", // Full width on smaller screens
  },
}));

const TeamPanel = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  // padding: "5rem",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "2rem",
  // backgroundColor: "rgba(84, 80, 155, 0.3)",
  maxWidth: "900px",
  [theme.breakpoints.down("md")]: {

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  },
}));

const TeamMember = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "1rem", 
  // width: "calc(25% - 2rem)",
  width: "200px",
  height: "200px", 
  marginRight: "1rem",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem", 
    width: "45%",
    paddingBottom: "1rem",
  },
}));


const ProfilePic = styled("img")(({ theme }) => ({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  marginBottom: "1rem",
}));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const Role = styled(Typography)(({ theme }) => ({

}));

const LinkedInLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleCheckout = () => {
    navigate("/home");
  };

  return (
    <Container>
      <Wrapper>
        <LeftPanel>
          <LogoPanel>
            <Logo
              src="/assets/images/Toolit_purple_Logo.png"
              alt="logo"
              style={{
                width: "400px",
                maxWidth: "100%",
                height: "auto",
                marginBottom: "2rem",
              }}
            />
            <Typography
              variant="h4"
              style={{
                maxWidth: "500px",
                marginTop: "5rem",
                marginBottom: "3rem",
                fontSize: "24px",
              }}
            >
              Redefining Inventory, One Bot At A Time
            </Typography>
            <SubText>
              Providing real-time visibility of inventory including issues,
              teams and projects. Toolit minimizes the risk of item shortages,
              enhances productivity, and prevents project delays due to
              miscommunication.
            </SubText>
            <StartButton
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Get Started!
            </StartButton>
          </LogoPanel>
          <ImagePanel>
            <Image src="/assets/images/landingPic.png" alt="landing" />
          </ImagePanel>
          <SubTextMobile style={{ fontSize: "20px" }}>
            Providing real-time visibility of inventory including issues, teams
            and projects. Toolit minimizes the risk of item shortages, enhances
            productivity, and prevents project delays due to miscommunication.
          </SubTextMobile>
        </LeftPanel>
        <RightPanel>
          <RightImage src="/assets/images/landingPic.png" alt="landing" />
        </RightPanel>
      </Wrapper>
      <Typography
        variant="h2"
        mb={2}
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          fontSize: "48px",
          paddingBottom: "2rem",
        }}
      >
        Features
      </Typography>
      <FeaturePanel>
        <Row>
          <IconTextContainer>
            <IconWrapper>
              <ToolIcon  sx={{ fontSize: 46 }} />
            </IconWrapper>
            <Title variant="body2">Tool Inventory Management</Title>
          </IconTextContainer>
          <IconTextContainer>
            <IconWrapper>
              <StockIssuesIcon  sx={{ fontSize: 46 }}/>
            </IconWrapper>
            <Title variant="body2">Issue Reporting</Title>
          </IconTextContainer>
        </Row>
        <Row>
          <IconTextContainer>
            <IconWrapper>
              <ProjectsIcon sx={{ fontSize: 46 }}/>
            </IconWrapper>
            <Title variant="body2">Team & Project Management</Title>
          </IconTextContainer>
          <IconTextContainer>
            <IconWrapper>
              <DataIcon  sx={{ fontSize: 46 }}/>
            </IconWrapper>
            <Title variant="body2">Data Analytics</Title>
          </IconTextContainer>
        </Row>
      </FeaturePanel>
      <div style={{backgroundColor: "rgba(84, 80, 155, 0.3)", width:"100%",display:"flex", justifyContent:"center" ,alignItems:"center"} }>
        <TeamPanel>
          <Typography
            variant="h3"
            m={3}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              fontSize: "48px",
              paddingBottom: "2rem",
            }}
          >
            Meet the Team
          </Typography>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/1.png"
              alt="Patricia Clemente"
            />
            <Name variant="h6">Patricia Clemente</Name>
            <Role variant="body2">UI/UX Designer</Role>
            <LinkedInLink
              href="https://www.linkedin.com/pat-clemente"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/3.png"
              alt="Anderson Marques"
            />
            <Name variant="h6">Anderson Marques</Name>
            <Role variant="body2">UI/UX Designer</Role>
            <LinkedInLink
              href="https://www.linkedin.com/in/andersonmarquesoli/"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/5.png"
              alt="Naoya Sasaki"
            />
            <Name variant="h6">Naoya Sasaki</Name>
            <Role variant="body2">UI/UX Designer</Role>
            <LinkedInLink
              href="https://www.linkedin.com/in/naoyadesigner/"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/2.png"
              alt="Tia Le Santo"
            />
            <Name variant="h6">Tia Le Santo</Name>
            <Role variant="body2">Co-PM/Design Lead</Role>
            <LinkedInLink
              href="https://www.linkedin.com/in/tialesanto/"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/7.png"
              alt="Emre Aydin"
            />
            <Name variant="h6">Emre Aydin</Name>
            <Role variant="body2">Full Stack Developer</Role>
            <LinkedInLink
              href="https://www.linkedin.com/in/eemraydin/"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/6.png"
              alt="Bethleen Baral"
            />
            <Name variant="h6">Bethleen Baral</Name>
            <Role variant="body2">Co-PM/Developer Lead</Role>
            <LinkedInLink
              href="https://www.linkedin.com/in/bethleen-baral/"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
          <TeamMember>
            <ProfilePic
              src="/assets/images/profilePics/4.png"
              alt="Masahiro Kanamaru"
            />
            <Name variant="h6">Masahiro Kanamaru</Name>
            <Role variant="body2">Full Stack Developer</Role>
            <LinkedInLink
              href="https://www.linkedin.com/in/masahiro-kanamaru-021b25234/"
              target="_blank"
            >
              LinkedIn
            </LinkedInLink>
          </TeamMember>
        </TeamPanel>
      </div>
      <Typography variant="h6" mb={2} style={{ fontWeight: "400" }}>
        © 2024 Tars - All Rights Reserved
      </Typography>
    </Container>
  );
};

export default Landing;
