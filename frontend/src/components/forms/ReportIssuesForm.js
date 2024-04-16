import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Alert from '@mui/material/Alert';

import CustomFormLabel from '../elements/CustomFormControlLabel.js';
import NumberInputBasic from "../elements/inputs/NumberInput.js";
import Label from '../elements/label.js';
import { default as CustomButton} from '../elements/buttons/Button.js';
import { fetchRooms } from "../../services/roomsApi";
import { sendData, updateData, fetchItems } from '../../services/api';

function ReportIssuesForm(props) {
  const [issueType, setIssueType] = React.useState();
  const [rooms, setRooms] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [error, setError] = React.useState();
  const [priority, setPriority] = React.useState();

  const handlePriority = (event) => {
    setPriority(event.target.value);
  }

  const handleSelectedRoom = (event) => {
      setSelectedRoom(event.target.value);
  };

  const handleDamage = () => {
    setIssueType("broken");
    props.setSelectedReportIssues({title: "Damage",
    subtitle: "Create issue report of the damaged item"})
  };
  const handleLoss = () => {
    setIssueType("missing");
    props.setSelectedReportIssues({title: "Loss",
    subtitle: "Create issue report of the lost item"})
  };

  const handleOutOfOrder = () => {
    setIssueType("out of order");
    props.setSelectedReportIssues({title: "Out Of Order",
    subtitle: "Create an issue report by selecting priority "})
  };

  React.useEffect(function loadRooms(){
    fetchRooms()
    .then(result =>{
        setRooms(result);
    }).catch(err => console.log(err))
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = document.getElementById("quantity").value;
    const issues = props.item.issues.find((issue) => issue.type == issueType);
    const data = {
                quantity: quantity,
                type: issueType,
                priority: priority,
                item: props.item._id,
                room: selectedRoom
            }
    if(issues){
        updateData("items/reportItem", issues._id,data)
        .then(()=>{
            props.handleClose();
            props.handleOpenCompleteSuccess()
            props.setMessage("Successfully reported")
            fetchItems(props.item._id, {}).then((results)=>{
                props.setItem(results);
            });
        })
        .catch(err => setError(err.response.data.error))
    }else{
        sendData("issues", data).then(()=>{
            props.handleClose();
            props.handleOpenCompleteSuccess()
            props.setMessage("Successfully reported")
            fetchItems(props.item._id, {}).then((results)=>{
                props.setItem(results);
            });
        })
        .catch(err => setError(err.response.data.error))
    }
    
}

  return (
    <Box >
      <Paper
        square
        elevation={0}
      >
      </Paper>
      <Box>
        
        {!issueType && (
            <Button variant="modaltab" fullWidth={true} onClick={handleDamage}>Damage <KeyboardArrowRight /></Button>
        )}

        {!issueType && (
            <Button variant="modaltab" fullWidth={true} onClick={handleLoss}>Loss <KeyboardArrowRight /></Button>
        )}

        {!issueType && props.item.type.toLowerCase() == "machine" && (
            <Button variant="modaltab" fullWidth={true} onClick={handleOutOfOrder} >Out of order<KeyboardArrowRight /></Button>
        )}

        {!issueType && (
          <Box sx={{marginTop: "8px"}}>
            <CustomButton type="reset" children={"Back"} gray
              onClick={() => {props.handleClose 
                            ? props.handleClose() 
                            : navigate(action.redirect);}}>
        
            </CustomButton>
          </Box>
        )}
       
        {issueType && (
            <form id="itemForm" method="post" encType="multipart/form-data"
                    onSubmit={event => handleSubmit(event)}
                    >
                <Label htmlFor="priority" >Priority</Label>
                <RadioGroup row name="priority" onChange={handlePriority} aria-label="priority">
                    <CustomFormLabel value="high" control={<Radio required/> } label="High" />
                    <CustomFormLabel value="medium" control={<Radio required/>} label="Medium" />
                </RadioGroup>
                <Label htmlFor="quantity" >How many tools were {issueType}?</Label>
                <NumberInputBasic id="quantity" required={true} ></NumberInputBasic>
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}

                <Label htmlFor="room" >Which room were the items in?</Label>
                <Select
                    id="room"
                    value={selectedRoom}
                    onChange={handleSelectedRoom}
                    displayEmpty
                    fullWidth={true}
                    >
                    <MenuItem value="">No Room Selected</MenuItem>
                    {rooms ? (
                        rooms.map((room) =>  <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>)
                        ) : (
                        <div>loading</div>
                        )}
                </Select>
                
                <Box sx={{marginTop: "24px"}}>
                  <CustomButton children={"Confirm"} green />
                  <CustomButton type="reset" children={"Cancel"} red
                          onClick={() => {props.handleClose 
                                          ? props.handleClose() 
                                          : navigate(action.redirect);}}>
                      
                  </CustomButton>
                </Box>
            </form>
        )}
      </Box>
    </Box>
  );
}

export default ReportIssuesForm;