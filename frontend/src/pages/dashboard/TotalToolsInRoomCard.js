import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "../../theme";
import { fetchRooms } from "../../services/roomsApi";


const ToolCount = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const RoomName = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.primary.main,
}));

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
});

const ReportIssueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: "8px",
  height: "40px",
  width: "92px",
}));

const ButtonContainer = styled(Box)({
  textAlign: "right",
  width: "100%",
  marginTop: "16px",

  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
});

function TotalToolsInRoomCard() {
  const [roomData, setRooms] = React.useState([]);

  React.useEffect(function loadRooms(){
    fetchRooms()
    .then(result =>{
        let roomsList=[];

        result.forEach(r =>{
          if(r.roomitems && r.roomitems.length > 0){
            const groups = Object.groupBy(r.roomitems, (obj) => obj.item.type);
            const tools = groups.tool ? groups.tool.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) : 0;
            const machines = groups.machine? groups.machine.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0) : 0;
            roomsList.push(
              {
                total: tools + machines,
                toolCount: tools,
                machineCount: machines,
                name: r.name
              });
          } else {
            roomsList.push(
              {
                total: 0,
                toolCount: 0,
                machineCount: 0,
                name: r.name
              });
          }
      })
      setRooms(roomsList);
    }).catch(err => console.log(err))
  },[roomData])

  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= theme.breakpoints.values.sm);
    };

    handleResize();
    if(!isMobileView){
      setPage(1);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme.breakpoints.values.sm, theme.breakpoints.values.md]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const itemsPerPage = isMobileView ? 2 : roomData.length;

  const startIndex = (page - 1) * itemsPerPage;
  const visibleRooms = roomData.slice(startIndex, startIndex + itemsPerPage);


  return (
  <>
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      }}
    >
    <CardContent>
        <Typography variant="h4" gutterBottom>
          Tools In Room
        </Typography>
        <Typography sx={{ mb: 3 }} variant="h6" color="text.secondary">
          Check the overall analytics for tools in use within each room
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {visibleRooms ?

            visibleRooms.map((room) => (
              <Grid
                item
                xs={4}
                key={room.name}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  [theme.breakpoints.down("sm")]: {
                    minWidth: "150px",
                  }                  
                }}
              >
                <Card
                  sx={{
                    height: 184,
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    border: "1px solid #E3E3E3",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: "none",
                    [theme.breakpoints.down("sm")]: {
                      height: 141,
                      minWidth: 136,
                    },
                  }}
                >
                  <Box>
                    <ToolCount variant="h3" sx={{ textAlign: "center" }}>
                      {room.total}
                    </ToolCount>
                    <Typography color="#323232" align="center" 
                      sx={{ fontSize: {md:"15px", xs:"14px"}, fontWeight:{md:"600", xs:"400"}}}
                    >
                      {room.toolCount > 1 ? `${room.toolCount} tools` :`${room.toolCount} tool`} 
                    </Typography>
                    <Typography color="#323232" align="center"
                      sx={{ fontSize: {md:"15px", xs:"14px"}, fontWeight:{md:"600", xs:"400"} }}
                    >
                      {room.machineCount > 1 ? `${room.machineCount} machines` : `${room.machineCount} machine`} 
                    </Typography>
                    <Typography
                      sx={{ fontSize: {md:"16px", xs:"15px"},  fontWeight:{md:"700", xs:"600"} }}
                      align="center"
                    >
                      {room.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))

          : 
          ("loading...")}
          
        </Grid>
        <PaginationContainer>
          {(isMobileView && (
            <Pagination
              count={Math.ceil(roomData.length / 2) || 1}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="small"
              variant="outlined"
              hideNextButton
              hidePrevButton
              sx={{ border:"none"}}
            />
          )) || (
            <Pagination
              count={0}
              page={0}
              color="primary"
              size="small"
              variant="outlined"
              hideNextButton
              hidePrevButton
            />
          )}
        </PaginationContainer>
        <ButtonContainer>
          <ReportIssueButton variant="outlined" size="small">
            See More
          </ReportIssueButton>
        </ButtonContainer>
      </CardContent>
    </Card>
  </>
    
  );
}

export default TotalToolsInRoomCard;
