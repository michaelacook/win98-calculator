/* main calculator buttons grid */

import React, { Component } from "react"
import FunctionButton from "./FunctionButton"
import NumberButton from "./NumberButton"
import MemoryButton from "./MemoryButton"

class MainButtonsGrid extends Component {
  render() {
    return (
      <div className="main-grid">
        <div className="button-row">
          <MemoryButton
            keyFunction={this.props.clearMemoryStore}
            value={"MC"}
          />
          <NumberButton printNumber={this.props.printNumber} value={7} />
          <NumberButton printNumber={this.props.printNumber} value={8} />
          <NumberButton printNumber={this.props.printNumber} value={9} />
          <FunctionButton keyFunction={this.props.division} value={"/"} />
          <FunctionButton keyFunction={this.props.squareRoot} value={"sqrt"} />
        </div>

        <div className="button-row">
          <MemoryButton
            keyFunction={this.props.retrieveMemoryStore}
            value={"MR"}
          />
          <NumberButton printNumber={this.props.printNumber} value={4} />
          <NumberButton printNumber={this.props.printNumber} value={5} />
          <NumberButton printNumber={this.props.printNumber} value={6} />
          <FunctionButton keyFunction={this.props.multiplication} value={"*"} />
          <FunctionButton keyFunction={this.props.percent} value={"%"} />
        </div>

        <div className="button-row">
          <MemoryButton
            keyFunction={this.props.addToMemoryStore}
            value={"MS"}
          />
          <NumberButton printNumber={this.props.printNumber} value={1} />
          <NumberButton printNumber={this.props.printNumber} value={2} />
          <NumberButton printNumber={this.props.printNumber} value={3} />
          <FunctionButton keyFunction={this.props.subtraction} value={"-"} />
          <FunctionButton keyFunction={this.props.reciprocal} value={"1/x"} />
        </div>

        <div className="button-row">
          <MemoryButton
            keyFunction={this.props.addToCurrentMemoryStore}
            value={"M+"}
          />
          <NumberButton printNumber={this.props.printNumber} value={0} />
          <FunctionButton
            keyFunction={this.props.toggleNegative}
            value={"+/-"}
          />
          <FunctionButton keyFunction={this.props.addDecimal} value={"."} />
          <FunctionButton keyFunction={this.props.addition} value={"+"} />
          <FunctionButton keyFunction={this.props.compute} value={"="} />
        </div>
      </div>
    )
  }
}

export default MainButtonsGrid
