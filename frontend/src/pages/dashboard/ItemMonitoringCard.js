import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Grid} from "@mui/material";
import theme from "../../theme";
import { Select, MenuItem } from "@mui/material";
import { fetchItems } from "../../services/api";

const NumberLinearProgress = (props) => {
  return (
    <Box display="flex" alignItems="center" sx={{borderLeft:"1px #A08FFE solid" }}>
      <Box width="100%"  sx={{paddingTop: 2}}>
      <Typography variant="body2" color="black" paddingLeft={"8px"}>
            {props.name}
      </Typography>
      <Grid container alignItems="center" >
        <Grid item container spacing={0} height="61px"  xs={11} >
          {(12/props.availablecount) * props.remaining > 0 && (
            <Grid item xs={(12/props.availablecount) * props.remaining} sx={{backgroundColor: "#A08FFE", textAlign:"left", padding: "16px 0 16px 16px"}} >
              <Typography variant="chartlabel">{props.remaining}</Typography>
            </Grid>
          )}
          {(12/props.availablecount) * props.inuse > 0 && (
            <Grid item xs={(12/props.availablecount) * props.inuse} sx={{backgroundColor: "#C5C2DB", textAlign:"right", padding: "16px 16px 16px 0"}} >
              <Typography variant="chartlabel">{props.inuse}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1} textAlign="right">
          <Typography variant="chartlabel" >{props.availablecount}</Typography>
        </Grid>
      </Grid>
    </Box>
   </Box>
  );
}

function ItemMonitoringCard() {
  const [itemData, setItemData] = useState([]);

  useEffect(function loadRooms(){
    fetchItems()
    .then(result =>{
      const groups = Object.groupBy(result, (obj) => obj.status);
      let temp = [];
      result.forEach(i => {
        temp.push({
          id: i.id,
          name: i.name,
          availablecount: i.availablecount,
          remaining: (i.availablecount - i.inrooms),
          inuse: i.inrooms,
          stock: Math.floor((i.availablecount - i.inrooms)/ i.availablecount * 100)
        })
      })
      temp.sort((a, b) => a.stock - b.stock);
      setItemData(temp.splice(0,3));
    }).catch(err => console.log(err))
  },[])

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        height: "100%", // Make sure the Card fills its container,
        padding: "0 20px"
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Item Monitoring
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: "13px" }} color="text.secondary">
          See which items are running low
        </Typography>
        <Box sx={{ mb: "32px"}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end',  mb: 1.5}} gap={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} gap={1}>
              <Typography variant="chartlegend">
                In Inventory
              </Typography>
              <Box backgroundColor="#A08FFE" height="20px" width="28px"></Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} gap={1}>
              <Typography variant="chartlegend">
                In Use
              </Typography>
              <Box backgroundColor="#C5C2DB" height="20px" width="28px"></Box>
            </Box>
          </Box>
        
          {itemData ? 
            itemData.map((item) => (
            <NumberLinearProgress key={item.id} value={item.stock} name={item.name} availablecount={item.availablecount} inuse={item.inuse} remaining={item.remaining}></NumberLinearProgress>
          ))
          :
          (<></>)}
        </Box>
        <Typography variant="chartlabel">Date</Typography>
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"Last Week"}
          label="Select Date"
          inputProps={{ "aria-label": "Select Date" }}
          style={{ width: "100%" }}
        >
          <MenuItem value="Last Week">Mar 31, 2024 - April 6, 2024</MenuItem>

        </Select>
      </CardContent>
    </Card>
  );
}

export default ItemMonitoringCard;
