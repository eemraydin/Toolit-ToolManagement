import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.green && "button--green"
        } ${props.red && "button--red"} ${props.gray && "button--gray"} ${
          props.inverse && "button--inverse"
        } ${props.left && "button--left"} ${props.bottom && "button--bottom"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.green && "button--green"
      } ${props.red && "button--red"} ${props.gray && "button--gray"} ${
        props.inverse && "button--inverse"
      } ${props.left && "button--left"} ${props.bottom && "button--bottom"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
