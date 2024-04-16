import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const CardContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    }));

const ButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  margin: "10px",
  gap: "10px",
  

  }));
  

const PriorityBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "10px",
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "8px",
}));

const PriortyTitlesAndBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  justifyItems: "center",
  marginBottom: "10px",
  gap: "5px",
}));

const PriortyTitle = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: theme.palette.primary.main,
}));

const PriorityCircle = styled(Box)(({ priority, theme }) => ({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor:
    priority === "high"
      ? theme.palette.accent.red
      : priority === "mid"
      ? theme.palette.accent.yellow
      : theme.palette.accent.green,
  marginRight: "5px",
}));

const ReportIssueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
}));

function ReportedIssueCard() {
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
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Reported Issues
        </Typography>
        <Typography sx={{ fontSize: "13px" }} color="text.secondary">
          Most recent broken, out of order or missing items
        </Typography>
        <PriorityBox>
          <PriortyTitlesAndBox>
            <PriorityCircle priority="mid" />
            <PriortyTitle variant="h6">Mid Priority</PriortyTitle>
          </PriortyTitlesAndBox>
          <Typography>
            <b>Missing:</b> Phillips Screwdriver
            <br />
            <b>Reported on:</b> 24/02/24
          </Typography>
        </PriorityBox>
        <PriorityBox>
          <PriortyTitlesAndBox>
            <PriorityCircle priority="high" />
            <PriortyTitle variant="h6">High Priority</PriortyTitle>
          </PriortyTitlesAndBox>
          <Typography>
            <b> Missing:</b> Scissors
            <br />
            <b>Reported on:</b> 24/02/24
          </Typography>
        </PriorityBox>
        <ButtonWrapper>
          <ViewAllButton variant="outlined">View All</ViewAllButton>
          <ReportIssueButton variant="outlined">Report Issue</ReportIssueButton>
        </ButtonWrapper>
      </CardContent>
    </Card>
  );
}

export default ReportedIssueCard;
