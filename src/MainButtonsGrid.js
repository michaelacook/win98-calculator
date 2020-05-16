import React, { Component } from "react";
import FunctionButton from "./FunctionButton";
import NumberButton from "./NumberButton";
import MemoryButton from "./MemoryButton";

class MainButtonsGrid extends Component {
  render() {
    return (
      <div className="main-grid">
        <div className="button-row">
          <MemoryButton value={"MC"} />
          <NumberButton printNumber={this.props.printNumber} value={7} />
          <NumberButton printNumber={this.props.printNumber} value={8} />
          <NumberButton printNumber={this.props.printNumber} value={9} />
          <FunctionButton value={"/"} />
          <FunctionButton value={"sqrt"} />
        </div>

        <div className="button-row">
          <MemoryButton value={"MR"} />
          <NumberButton printNumber={this.props.printNumber} value={4} />
          <NumberButton printNumber={this.props.printNumber} value={5} />
          <NumberButton printNumber={this.props.printNumber} value={6} />
          <FunctionButton value={"*"} />
          <FunctionButton value={"%"} />
        </div>

        <div className="button-row">
          <MemoryButton value={"MS"} />
          <NumberButton printNumber={this.props.printNumber} value={1} />
          <NumberButton printNumber={this.props.printNumber} value={2} />
          <NumberButton printNumber={this.props.printNumber} value={3} />
          <FunctionButton value={"-"} />
          <FunctionButton value={"1/x"} />
        </div>

        <div className="button-row">
          <MemoryButton value={"M+"} />
          <NumberButton printNumber={this.props.printNumber} value={0} />
          <FunctionButton value={"+/-"} />
          <FunctionButton value={"."} />
          <FunctionButton value={"+"} />
          <FunctionButton value={"="} />
        </div>
      </div>
    );
  }
}

export default MainButtonsGrid;
