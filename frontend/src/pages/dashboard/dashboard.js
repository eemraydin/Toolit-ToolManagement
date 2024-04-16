import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TotalToolsInRoomCard from "./TotalToolsInRoomCard";
import ItemMonitoringCard from "./ItemMonitoringCard";
import ReportedIssueCard from "./ReportedIssueCard";
import UpcommingEventsCard from "./UpcommingEventsCard";
import QuickActionsCard from "./QuickActions";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Searchbar from "../../components/elements/inputs/Searchbar";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";


// Dummy data for the TotalToolsInRoomCard component
const roomData = [
  { roomName: "Room 1", toolCount: 10 },
  { roomName: "Room 2", toolCount: 20 },
  { roomName: "Room 3", toolCount: 30 },
];

const GridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    marginBottom: "60px"
  },

}));

const UserNameBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start", 
  justifyItems: "center",
  margin: "1rem",
  gap: "10px",

  [theme.breakpoints.down("sm")]: {
    justifyContent: "start",
    alignItems: "start",
  },
}));

const SearchContainerMobile = styled(Card)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "1rem",
    paddingBottom: "16px",
    marginRight: "16px",
    marginBottom: "1rem",
    alignItems: "center",
    backgroundColor: theme.palette.surface[100],

    borderRadius: "16px",
    width: "100%",
  },
}));

const ItemMonitor = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
  marginTop: "-50px"
  },
}));

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search/${query}`, { state: { itemName: query } });
  };

  useEffect(() => {
    // Simulate fetching user data from local storage
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Render loading state until user data is fetched
 if (loading) {
   return (
     <GridContainer container>
       <CircularProgress color="secondary" size={150} />
     </GridContainer>
   );
 }

  return (
    <GridContainer container>
      <Grid item xs={12} sx={{ height: "70px" }}>
        <UserNameBox>
          <WavingHandIcon sx={{ color: "#54509B" }} />
          <Typography fontSize={"24px"}>
            Welcome back, {currentUser?.user?.name}!
          </Typography>
        </UserNameBox>
      </Grid>

      <SearchContainerMobile>
        <Searchbar onSearch={handleSearch} customWidth="90%" />
      </SearchContainerMobile>

      <Grid item xs={12}>
        <Grid container spacing={0.1}>
          <Grid item lg={4}  sm={4} xs={12} sx={{ padding: 2 }}>
            <QuickActionsCard />
          </Grid>
          <Grid item lg={8} sm={8} xs={12} sx={{ padding: 2 }}>
            <TotalToolsInRoomCard roomData={roomData} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={0.1}>
          <ItemMonitor item xs={12} md={4} sx={{ padding: 2 }}>
            <ItemMonitoringCard />
          </ItemMonitor>
          <Grid item xs={12} md={4} sx={{ padding: 2 }}>
            <ReportedIssueCard />
          </Grid>
          <Grid item xs={12} md={4} sx={{ padding: 2 }}>
            <UpcommingEventsCard />
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default Dashboard;
