import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function DashboardIcon(props) {
    return (
        <SvgIcon sx={props.sx}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H10V12H4V4Z" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 16H10V20H4V16Z" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 12H20V20H14V12Z" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 4H20V8H14V4Z" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </SvgIcon>
    );
}