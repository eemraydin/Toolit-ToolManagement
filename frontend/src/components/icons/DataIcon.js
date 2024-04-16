import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function DataIcon(props) {
  return (
    <SvgIcon sx={props.sx}>
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="27.6306"
          cy="27.6279"
          r="23.8696"
          transform="rotate(-95.1436 27.6306 27.6279)"
          stroke="white"
          strokeWidth="2"
        />
        <mask id="path-2-inside-1_3699_23682" fill="white">
          <path d="M25.401 2.85851C30.3 2.41753 35.2196 3.43917 39.5379 5.7942C43.8562 8.14925 47.3792 11.7319 49.6614 16.0892C51.9435 20.4465 52.8823 25.3826 52.3591 30.2734C51.8359 35.1643 49.8741 39.7901 46.7218 43.566L27.6306 27.6279L25.401 2.85851Z" />
        </mask>
        <path
          d="M25.401 2.85851C30.3 2.41753 35.2196 3.43917 39.5379 5.7942C43.8562 8.14925 47.3792 11.7319 49.6614 16.0892C51.9435 20.4465 52.8823 25.3826 52.3591 30.2734C51.8359 35.1643 49.8741 39.7901 46.7218 43.566L27.6306 27.6279L25.401 2.85851Z"
          stroke="white"
          strokeWidth="4"
          mask="url(#path-2-inside-1_3699_23682)"
        />
      </svg>
    </SvgIcon>
  );
}
