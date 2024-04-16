import React from "react";
import { fetchItems } from "../../services/api";
import ImageCard from "../elements/cards/ImageCard";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export function loader({params}) {
    return fetchItems(params.id);
  }
  
const ItemImage = props =>{ 
    let item = props.item; 
    return (
        <>
            {item ? (
            <>
            <Grid container rowGap={2.5}>
                <Grid item xs={12}>
                    <ImageCard border style={{maxHeight: "271px"}} src={item.image} alt={item.name}></ImageCard>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Description</Typography>
                    <Typography>{item.description}</Typography>
                </Grid>
            </Grid>
            </>
            ) : (
            <div>Loading...</div>
            )}
        </>
        );
}       
    
export default ItemImage;