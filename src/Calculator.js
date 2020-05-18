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
          addDecimal={this.props.addDecimal}
          compute={this.props.compute}
          addition={this.props.addition}
          subtraction={this.props.subtraction}
          multiplication={this.props.multiplication}
          division={this.props.division}
          squareRoot={this.props.squareRoot}
          percent={this.props.percent}
          reciprocal={this.props.reciprocal}
          toggleNegative={this.props.toggleNegative}
        />
      </div>
    )
  }
}

export default Calculator
