import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Searchbar from "../../elements/inputs/Searchbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { newRequest } from "../../../services/api";

const HeaderLogoutIcon = styled(ExitToAppIcon)`
  background-color: white;
  border-radius: 50%;
  padding: 8px;
`;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  height: "64px",
  [theme.breakpoints.up("sm")]: {
    height: "70px",
  },
}));

const SearchbarInput = styled(Searchbar)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  
}));

const SearchContainer = styled("div")(({ theme }) => ({
  display: "none",

  [theme.breakpoints.up("sm")]: {
    backgroundColor: theme.palette.surface[100], // Use surface 100 color from the theme
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    width: "260px",
    height: "48px",
    alignItems: "center",
    justifyContent: "start",
    margin:0,
  },

}));



const HeaderIconContainer = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "26px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const HeaderAddIcon = styled(AddIcon)`
  background-color: white;
  color: #54509b;
  border-radius: 50%;
  padding: 8px;
`;

const HeaderAskIcon = styled(HelpOutlineIcon)`
  background-color: white;
  border-radius: 50%;
  padding: 8px;
`;

const HeaderSettingsIcon = styled(SettingsOutlinedIcon)`
  background-color: white;
  border-radius: 50%;
  padding: 8px;
`;
const LogoLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const Logo = styled("img")(({ theme }) => ({
  width: "119px",
}));

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);

  // Open/close functions for the first menu
  const handleQuickClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleQuickClose = () => {
    setAnchorEl(null);
  };

  // Open/close functions for the second menu
  const handleUserClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleUserClose = () => {
    setAnchorEl2(null);
  };

  const handleSearch = (query) => {
    navigate(`/search/${query}`, { state: { itemName: query } });
  };

  const handleLogout = async () => {
    try {
      await newRequest.post("/users/logout");
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

   const [currentUser, setCurrentUser] = useState(null);
   useEffect(() => {
     const user = JSON.parse(localStorage.getItem("currentUser"));
     setCurrentUser(user);
   }, []);
  return (
    <>
      <StyledToolbar>
        <LogoLink to="/">
          <Logo alt="Toolit" src="/assets/images/toolit_Logo.png" />
        </LogoLink>
        {location.pathname !== "/items" &&
          location.pathname !== "/issues" && ( // Check if the path is not /items or /issues
            <SearchContainer>
              <SearchbarInput onSearch={handleSearch} />
            </SearchContainer>
          )}
        <HeaderIconContainer aria-label="Quick Action">
          <Stack direction="row" spacing={0}>
            <Tooltip title="Quick Actions">
              <IconButton
                onClick={handleQuickClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={anchorEl ? "quick-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
              >
                <HeaderAddIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="quick-menu"
              open={open}
              onClose={handleQuickClose}
              onClick={handleQuickClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem component={Link} to="/items/new">
                Add Item To Inventory
              </MenuItem>
              <MenuItem component={Link} to="/projects/new">
                Add New Project
              </MenuItem>
              <MenuItem component={Link} to="/rooms/new">
                Add New Room
              </MenuItem>
              <MenuItem component={Link} to="/issues">
                Report Issues
              </MenuItem>
            </Menu>
            <IconButton>
              <Tooltip title="Get Help">
                <HeaderAskIcon />
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title="Settings">
                <HeaderSettingsIcon aria-label="Settings" />
              </Tooltip>
            </IconButton>

            <IconButton>
              <Tooltip title="Profile">
                <Avatar
                  alt="profilePicture"
                  src="/assets/images/profilePic.jpg"
                />
              </Tooltip>
            </IconButton>
          </Stack>
        </HeaderIconContainer>
        <UserBox>
          <IconButton
            onClick={handleQuickClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={anchorEl ? "quick-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? "true" : undefined}
          >
            <HeaderAddIcon />
          </IconButton>
          <IconButton
            onClick={handleUserClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={anchorEl2 ? "simple-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl2 ? "true" : undefined}
          >
            <Avatar
              alt="profilePicture"
              src={currentUser?.user?.image || ""}
            ></Avatar>
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleUserClose}
            onClick={handleUserClose}
          >
            <MenuItem>Profile Settings</MenuItem>
            <MenuItem>Support</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </UserBox>
      </StyledToolbar>
    </>
  );
}

export default Header;
