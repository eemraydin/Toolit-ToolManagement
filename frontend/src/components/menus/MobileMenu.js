import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import ToolIcon from "../icons/ToolIcon";
import StockIssuesIcon from "../icons/StockIssuesIcon";
import ProjectsIcon from "../icons/ProjectsIcon";
import RoomsIcon from "../icons/RoomsIcon";
import HomeIcon from "../icons/HomeIcon";

function MobileMenu() {
  const [value, setValue] = React.useState(0);
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        bottom: 0,
        width: "100%",
        minHeight: "64px",
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        zIndex: 1000, // Ensure menu is on top of content

        // Border
        borderTop: "1px solid #e0e0e0",
        boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.1)",
        
      }}
    >
      <Box sx={{ width: "100%"}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon mobile={true}/>}
            LinkComponent={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Inventory"
            icon={<ToolIcon mobile={true}/>}
            LinkComponent={Link}
            to="/items"
          />
          <BottomNavigationAction
            label="Projects"
            icon={<ProjectsIcon mobile={true}/>}
            LinkComponent={Link}
            to="/projects"
          />
          <BottomNavigationAction
            label="Issues"
            icon={<StockIssuesIcon mobile={true}/>}
            LinkComponent={Link}
            to="/issues"
          />
          <BottomNavigationAction
            label="Rooms"
            icon={<RoomsIcon mobile={true}/>}
            LinkComponent={Link}
            to="/rooms"
          />
        </BottomNavigation>
      </Box>
    </Grid>
  );
}

export default MobileMenu;
