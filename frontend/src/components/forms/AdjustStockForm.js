import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Alert from '@mui/material/Alert';

import NumberInputBasic from "../elements/inputs/NumberInput.js";
import Label from '../elements/label.js';
import { default as CustomButton} from '../elements/buttons/Button.js';
import { updateData, fetchItems, deleteData } from '../../services/api';


function AdjustStockForm(props) {
  const [adjustType, setAdjustType] = React.useState();
  const [stock, setStock] = React.useState();

  const [quantityLabel, setQuantityLabel] = React.useState();
  const [error, setError] = React.useState();

  const handleReceive = () => {
    setAdjustType("receive");
    setQuantityLabel("Quantity"); 
    setStock(null);
    props.setSelectedAdjustType({title: "Stock Receive",
    subtitle: "Choose the number of new stocks"})
  };
  const handleRecount = () => {
    setAdjustType("recount");
    setQuantityLabel("Stock"); 
    setStock(props.item.availablecount);
    props.setSelectedAdjustType({title: "Stock Recount",
    subtitle: "Adjust the number of stocks"})
  };

  const handleDecommission = () => {
    setAdjustType("decommission");
    props.setSelectedAdjustType({title: "Decommission",
    subtitle: "This item is no longer available"})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(adjustType == "decommission"){
      deleteData("items", props.item._id)
      .then(()=>{
          props.handleClose();
          props.handleOpenCompleteSuccess()
          props.setMessage("Completed")
          fetchItems(props.item._id, {}).then((results)=>{
              props.setItem(results);
          });
      })
      .catch(err => setError(err.response.data.error))

    }else{
      let endpoint;
      switch(adjustType){
        case 'receive': endpoint = `items/receive`;break;
        case 'recount': endpoint = `items/recount`;break;
        default: endpoint = "items"; break;
      }

      updateData(endpoint, props.item._id,{quantity : document.getElementById("quantity").value})
      .then(()=>{
          props.handleClose();
          props.handleOpenCompleteSuccess()
          props.setMessage("Successfully updated")
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
        
        {!adjustType && (
            <Button variant="modaltab" fullWidth={true} onClick={handleReceive}>Stock receive <KeyboardArrowRight /></Button>
        )}

        {!adjustType && (
            <Button variant="modaltab" fullWidth={true} onClick={handleRecount}>Stock recount <KeyboardArrowRight /></Button>
        )}

        {!adjustType && (
            <Button variant="modaltab" fullWidth={true} onClick={handleDecommission}>Decommission <KeyboardArrowRight /></Button>
        )}
       
        {!adjustType && (
            <Box sx={{marginTop: "8px"}}>
              <CustomButton type="reset" children={"Back"} gray
                onClick={() => {props.handleClose 
                              ? props.handleClose() 
                              : navigate(action.redirect);}}>
          
              </CustomButton>
            </Box>
        )}

        {adjustType 
        && (
            <form id="itemForm" method="post" encType="multipart/form-data" onSubmit={event => handleSubmit(event)}>
              {adjustType !== "decommission" &&
                (
                  <>
                  <Label htmlFor="quantity" children={quantityLabel}></Label>
                  <NumberInputBasic id="quantity" required={true} defaultValue={stock}></NumberInputBasic>
                  </>
                )
              }
                <br></br> 
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}

                <CustomButton children={"Confirm"} green />
                <CustomButton type="reset" children={"Cancel"} red
                        onClick={() => {props.handleClose 
                                        ? props.handleClose() 
                                        : navigate(action.redirect);}}>
                    
                </CustomButton>
            </form>
        )
        }
      </Box>
    </Box>
  );
}

export default AdjustStockForm;