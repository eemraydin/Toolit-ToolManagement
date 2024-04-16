import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";



const Content = styled(CardContent)`
  height: "100%";
`;

const CardWrapper = styled("div")`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const PriorityBox = styled(Box)`
  background-color: #f5f5f5;
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  
`;

const PriortyTitle = styled(Typography)`
  font-size: 15px;
  color: #3f51b5;
`;

function UpcommingEventsCard() {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        height: "100%", 
      }}
    >
      <Content>
        <Typography variant="h4" gutterBottom>
          Upcoming Events
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: "13px" }} color="text.secondary">
          Next events in your Google Calendar
        </Typography>

        <PriorityBox>
          <PriortyTitle variant="h6">
            <b>10:00 - 13:00</b>
          </PriortyTitle>
          <Typography variant="h4" style={{ marginBottom: "5px" }}>
            BC Regional Competition
          </Typography>
          <Typography variant="body2">Alpha Robotics Team</Typography>
        </PriorityBox>
        <PriorityBox>
          <PriortyTitle variant="h6">
            <b>10:00 - 14:00</b>
          </PriortyTitle>
          <Typography variant="h4" style={{ marginBottom: "5px" }}>
            Washington State Comp.
          </Typography>
          <Typography variant="body2">Alpha Robotics Team</Typography>
        </PriorityBox>
      </Content>
    </Card>
  );
}

export default UpcommingEventsCard;
