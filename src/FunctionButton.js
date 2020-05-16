import React from "react";

const FunctionButton = (props) => {
  return (
    <button onClick={props.keyFunction} className="main-button">
      {props.value}
    </button>
  );
};

export default FunctionButton;
