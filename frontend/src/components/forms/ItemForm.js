import React, { useState } from "react";
import  { useNavigate  } from 'react-router-dom'
import { addItem, editItem } from "../../services/api";
import Button from '../elements/buttons/Button.js';
import Typography from '@mui/material/Typography';
import TextInput from '../elements/textinput.js';
import Label from '../elements/label.js';
import UploadButton from "../elements/uploadbutton.js";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import SuccessSnackbar from "../elements/dialogs/SuccessSnackbar.js";

const ItemForm = props =>{
    const navigate = useNavigate();
    const item = props.item ?? [];
    const action = props.action ?? {
            buttonLabel: "Add New Item", 
            innerButtonLabel: "Add Item",
            method: "POST",
            redirect: "/items/"
      }
    const [file, setFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [error, setError] = React.useState();
    const [state, setState] = useState({open: false});
    const [message, setMessage] = useState();
  
    const { open } = state;
    const handleClose = () => {
      setState({ ...state, open: false });
    };

    
    React.useEffect(()=>{
        if (file) {
            setImageUrl(URL.createObjectURL(file));
          }
    },[file])

    const handleSubmit = async (e, id = null) => {
        e.preventDefault();    
        const myFormData = new FormData(e.target);
        const formDataObj = {};
        
        myFormData.forEach((value, key) => (formDataObj[key] = value));
        myFormData.append("file", file);
        myFormData.append("body", formDataObj);

        if(action.method == "POST"){
            addItem(myFormData)
            .then(()=> {
                setMessage("Successfully added")
                setState({open: true})
                navigate("/items/");
            })
            .catch(err => {
                setError(err.response.data.error)
            })
            
        }else if(action.method == "PATCH"){
            editItem(id, myFormData)
            .then(response=> {
                if(response.status == 200){
                    props.handleItem(response.data.item);
                    props.handleClose();
                    props.handleOpenCompleteSuccess();
                    props.setMessage("Successfully updated");
                }
            })
            .catch(err => {
                setError(err.response.data.error)
            })
        }
    }
    
    return (
        <>
        <SuccessSnackbar
        open={open}
        onClose={handleClose}
        message={message}
      />
            <Typography variant="h4" >
                Item Details
            </Typography>
            <form id="itemForm" method="post" encType="multipart/form-data"
                    onSubmit={event => handleSubmit(event, item._id)}>
                <Grid container columnSpacing={6} rowSpacing={3}>
                    <Grid item xs={12} md={4}>
                        <Label htmlFor="name" >Name*</Label>
                        <TextInput
                            required
                            id="name"
                            name="name"
                            placeholder="Name goes here"
                            defaultValue={item.name}
                        ></TextInput>

                        <Label htmlFor="brand" >Brand</Label>
                        <TextInput 
                            id="brand"
                            name="brand"
                            placeholder="Brand of item goes here"
                            defaultValue={item.brand}
                        />
                        
                        <Label htmlFor="availablecount" >Quantity*</Label>
                        <TextInput 
                            type="number"
                            disabled={!(item._id == undefined)}
                            required={(item._id == undefined)}
                            id="availablecount"
                            name="availablecount"
                            placeholder="1234"
                            defaultValue={item.availablecount}
                        />

                        <Label htmlFor="reference" >SKU*</Label>
                        <TextInput 
                            required
                            id="reference"
                            name="reference"
                            placeholder="Reference No."
                            defaultValue={item.reference}
                        />
                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}
                        <Label htmlFor="size" >Size</Label>
                        <TextInput 
                            id="size"
                            name="size"
                            placeholder="e.g. 1/4"
                            defaultValue={item.size}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Label htmlFor="type" >Category</Label>
                        <RadioGroup row name="type" defaultValue={item.type ? item.type : "tool"} >
                            <FormControlLabel value="tool" control={<Radio/>} label="Tool" />
                            <FormControlLabel value="machine" control={<Radio />} label="Machine" />
                        </RadioGroup>

                        <Label htmlFor="threshold" >Minimum Quantity</Label>
                        <TextInput 
                            type="number"
                            id="threshold"
                            name="threshold"
                            placeholder="1234"
                            defaultValue={item.threshold}
                        />

                        <Label htmlFor="description" >Description</Label>
                        <TextInput 
                            id="description"
                            name="description"
                            placeholder="Item description"
                            multiline
                            rows={12.25}
                            defaultValue={item.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Label htmlFor="image" >Image</Label>
                        <UploadButton file={file} setFile={setFile} imageUrl={imageUrl}/>
                    </Grid>
                    <Grid item md={12}>
                        <Button type="submit" children={action.innerButtonLabel} green/>
                        <Button type="reset" children={"Cancel"} red
                                onClick={() => {props.handleClose 
                                                ? props.handleClose() 
                                                : navigate(action.redirect);}}
                                        >
                            
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );

}

export default ItemForm;