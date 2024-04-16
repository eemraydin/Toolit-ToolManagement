import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import theme from "../../theme";


function QuickActionsCard() {
  return (
    <ThemeProvider theme={theme}>
      <CardContent
        sx={{
          backgroundColor: theme.palette.surface[100],
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          padding: theme.spacing(2),
          maxHeight: "270px",
        }}
      >
        <Typography variant="h5" component="div">
          Quick Actions
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: "13px" }}>
          Direct links to specific areas
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/items/new">
              <ListItemText primary="Add New Item To Inventory" />
              <OpenInNewIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/rooms/new">
              <ListItemText primary="Add New Room" />
              <OpenInNewIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/projects/new">
              <ListItemText primary="Add New Project" />
              <OpenInNewIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/issues">
              <ListItemText primary="Report Issues" />
              <OpenInNewIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </ThemeProvider>
  );
}

export default QuickActionsCard;
