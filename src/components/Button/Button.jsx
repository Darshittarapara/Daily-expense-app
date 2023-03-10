import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      disabled={props.disable}
      type={props.type}
      onClick={props.onClick}
      className={props.classes ? props.classes : "btn btn-success "}
    >
      {props.children}
    </button>
  );
};
export default Button;
