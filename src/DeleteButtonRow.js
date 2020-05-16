import React, { Component } from "react";
import DeleteButton from "./DeleteButton";

class DeleteButtonRow extends Component {
  render() {
    return (
      <div>
        <span className="box"></span>
        <DeleteButton value={"Backspace"} />
        <DeleteButton value={"CE"} />
        <DeleteButton keyFunction={this.props.clearDisplay} value={"C"} />
      </div>
    );
  }
}

export default DeleteButtonRow;
