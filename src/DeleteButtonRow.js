import React, { Component } from "react";
import DeleteButton from "./DeleteButton";

class DeleteButtonRow extends Component {
  render() {
    return (
      <div>
        <span className="box"></span>
        <DeleteButton keyFunction={this.props.backSpace} value={"Backspace"} />
        <DeleteButton keyFunction={this.props.backSpace} value={"CE"} />
        <DeleteButton keyFunction={this.props.clearDisplay} value={"C"} />
      </div>
    );
  }
}

export default DeleteButtonRow;
