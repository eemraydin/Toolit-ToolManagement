import React from "react";
import  { useNavigate  } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '../elements/buttons/Button.js';
import Label from '../elements/label.js';
import NumberInputBasic from "../elements/inputs/NumberInput.js";
import { fetchRooms } from "../../services/roomsApi";
import { createRoomItem } from "../../services/roomItemsApi";
import { reserveItem, fetchItems } from "../../services/api.js"
import { Typography } from "@mui/material";

const ReserveForm = props =>{
    const navigate = useNavigate();
    const [rooms, setRooms] = React.useState(false);
    const [selectedRoom, setSelectedRoom] = React.useState("");

    const [error, setError] = React.useState();

    const handleSelectedRoom = (event) => {
        setSelectedRoom(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomitem = props.item.roomitems.find((roomitem) => roomitem.room._id == selectedRoom)

        if(roomitem){
            reserveItem(roomitem._id, {quantity: document.getElementById("quantity").value})
            .then(()=>{
                setError();
                props.handleClose();
                props.handleOpenCompleteSuccess()
                props.setMessage("Successfully reserved")
                fetchItems(props.item._id).then((results)=>{
                    props.setItem(results);
                });
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
        }else{
            let roomItemObj = { 
                quantity: document.getElementById("quantity").value,
                room: selectedRoom,
                item: props.item._id
            };
            createRoomItem(roomItemObj)
            .then(()=>{
                setError();
                props.handleClose();
                props.handleOpenCompleteSuccess()
                props.setMessage("Successfully reserved")
                fetchItems(props.item._id).then((results)=>{
                    props.setItem(results);
                })
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
        }
    }

    React.useEffect(function loadRooms(){
        fetchRooms()
        .then(result =>{
            setRooms(result);
        }).catch(err => console.log(err))
      },[])

    return (
        <>
            <form id="itemForm" method="post" encType="multipart/form-data"
                    onSubmit={event => handleSubmit(event)}
                    >
                <Label htmlFor="room" >Select Room</Label>
                <Select
                    fullWidth={true}
                    id="room"
                    value={selectedRoom}
                    onChange={handleSelectedRoom}
                    displayEmpty
                    required={true}
                    >
                    <MenuItem value="">
                    No Room Selected
                    </MenuItem>
                    {rooms ? (
                        rooms.map((room) =>  <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>)
                        ) : (
                        <div>loading</div>
                        )}
                </Select>

                <Box sx={{ display: {md:'flex'}, flexWrap: 'wrap', justifyContent: {md:'space-between'}, alignItems:'flex-start', marginTop: '24px'}}>
                    <Label htmlFor="quantity" sx={{marginTop: '0'}} >How many do you want to move?</Label>
                    <Box >
                        <NumberInputBasic id="quantity" required={true} ></NumberInputBasic>
                        <Typography align="right" variant="subtitle2">*In Inventory: {props.item.availablecount - props.item.inrooms} left</Typography>
                    </Box >
                </Box>
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}

            <Box sx={{marginTop: "24px"}}>
                <Button children={"Reserve"} green />
                <Button type="reset" children={"Cancel"} red
                        onClick={() => {props.handleClose 
                                        ? props.handleClose() 
                                        : navigate(action.redirect);}}>
                    
                </Button>
            </Box>
            </form>
        </>
    );

}

export default ReserveForm;