/* body of the window containing calculator components */

import Display from "./Display"
import React, { Component } from "react"
import DeleteButtonRow from "./DeleteButtonRow"
import MainButtonsGrid from "./MainButtonsGrid"

class Calculator extends Component {
  render() {
    return (
      <div className="window-body body">
        <Display display={this.props.display} />
        <DeleteButtonRow
          clearDisplay={this.props.clearDisplay}
          backSpace={this.props.backSpace}
        />
        <MainButtonsGrid
          printNumber={this.props.printNumber}
          setFloatState={this.props.setFloatState}
        />
      </div>
    )
  }
}

export default Calculator
