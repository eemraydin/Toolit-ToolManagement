import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function HomeIcon(props) {
  return (
    <SvgIcon sx={props.sx}>
      {
        props.mobile ?
        (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.87">
          <path d="M20 11.5162V20.0007H15V15.5007C15 14.6723 14.3284 14.0007 13.5 14.0007H10.5C9.67158 14.0007 9 14.6723 9 15.5007V20.0007H4V11.5162L12 4.34375L20 11.5162Z" 
          stroke="#323232"
          strokeWidth="2"/>
          </g>
        </svg>
        )
        :
        (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11.5162V20.0007H15V15.5007C15 14.6723 14.3284 14.0007 13.5 14.0007H10.5C9.67158 14.0007 9 14.6723 9 15.5007V20.0007H4V11.5162L12 4.34375L20 11.5162Z" 
            stroke="#F4F4F4"
            strokeWidth="2"/>
          </svg>
        )
      }
      

    </SvgIcon>
  );
}
