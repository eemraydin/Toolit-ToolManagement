import React, { useState, useEffect } from "react";
import { NavLink, useLocation ,useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Button } from "@mui/material";
import {newRequest} from "../../../services/api";

import ToolIcon from "../../icons/ToolIcon";
import StockIssuesIcon from "../../icons/StockIssuesIcon";
import ProjectsIcon from "../../icons/ProjectsIcon";
import RoomsIcon from "../../icons/RoomsIcon";
import DashboardIcon from "../../icons/DashboardIcon";

const Container = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  display: "block ",
  position: "fixed",
  height: "100vh",
  width: 236,
  backgroundColor: theme.palette.secondary,
  color: "white",
  paddingTop: 104,
}));


const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
  },
  {
    text: "Inventory",
    icon: <ToolIcon />,
    link: "/items",
  },
  {
    text: "Projects",
    icon: <ProjectsIcon />,
    link: "/projects",
  },
  {
    text: "Stock Issues",
    icon: <StockIssuesIcon />,
    link: "/issues",
  },
  {
    text: "Rooms",
    icon: <RoomsIcon />,
    link: "/rooms",
  },
];

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const LinkIcon = styled(ListItemIcon)`
  min-width: 20px !important;
  margin-right: 20px;
`;

const CustomListItemText = styled(ListItemText)`
  color: white;
  font-size: 17px;
  margin-left: 0px;
  padding-left: 0px;
`;

const ButtonLink = styled(ListItemButton)`
  && {
    &:hover {
      background-color: #54509b !important;
    }
    ${(props) =>
      props.selected &&
      `
      background-color: #54509b !important;
    `}
  }
`;


function Sidebar() {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/users/logout");
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const storedIndex = localStorage.getItem("selectedIndex");
    return storedIndex !== null ? parseInt(storedIndex, 10) : 0;
  });

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    localStorage.setItem("selectedIndex", index.toString());
  };

  useEffect(() => {
    const index = menuItems.findIndex(
      (item) => item.link === `/${location.pathname.split("/")[1]}`
    );
    setSelectedIndex(index !== -1 ? index : 0);
  }, [location]);

  return (
    <Container
      sx={{
        width: "100%",
        maxWidth: 236,
        backgroundColor: "#342c62",
        display: { xs: "none", md: "block" },
      }}
      flex={1}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "0 24px", fontSize: "18px" }}
      >
        Menu
      </Typography>
      <List
        component="nav"
        aria-label="main sidebar menu"
        style={{ margin: "18px 0 0 0" }}
      >
        {menuItems.map((item, index) => (
          <StyledNavLink to={item.link} key={index}>
            <ButtonLink
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <LinkIcon style={{ color: "white" }}>{item.icon}</LinkIcon>
              <CustomListItemText primary={item.text} />
            </ButtonLink>
          </StyledNavLink>
        ))}
      </List>

      <Box sx={{ display:"flex", position:"fixed", justifyContent:"flex-end", justifyItems:"end",flexGrow: 1 , bottom:0 }} >
      <Button variant="logout" sx={{ margin: "0 24px 24px 24px" }}
        onClick={handleLogout} startIcon={<ExitToAppOutlinedIcon></ExitToAppOutlinedIcon>}
      >
        Logout
      </Button>
          </Box>
    </Container>
  );
}

export default Sidebar;
