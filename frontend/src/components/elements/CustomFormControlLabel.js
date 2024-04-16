import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';


const CustomFormLabel = (props) =>{
  return (
    <FormControlLabel {...props} sx={{
      '& .MuiFormControlLabel-asterisk': {
        display: 'none'
      },
    }}/>
  )
}

export default CustomFormLabel;
