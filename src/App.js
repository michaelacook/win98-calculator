/* root component */

import React, { Component } from "react"
import Header from "./Header"
import Calculator from "./Calculator"
import Options from "./Options"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "0.",
      expression: [""],
      int: true,
      float: false,
    }
  }

  /**
   * Render the root level component
   */
  render() {
    return (
      <div className="window">
        <Header />
        <Options />
        <Calculator
          display={this.state.display}
          printNumber={this.printNumber}
          clearDisplay={this.clearDisplay}
          backSpace={this.backSpace}
          addDecimal={this.addDecimal}
          compute={this.compute}
          addition={this.addition}
          subtraction={this.subtraction}
          multiplication={this.multiplication}
          division={this.division}
          squareRoot={this.squareRoot}
          percent={this.percent}
          reciprocal={this.reciprocal}
          toggleNegative={this.toggleNegative}
        />
      </div>
    )
  }

  /**
   * Set the state of the application to handle floats
   * Used when the user clicks the "." (decimal) button
   */
  setFloatState = () => {
    this.setState({
      int: false,
      float: true,
    })
  }

  /**
   * Set application state to handle integers
   */
  setIntState = () => {
    this.setState({
      int: true,
      float: false,
    })
  }

  /**
   * Set int or float depending on whether contains a decimal
   */
  toggleNumberType = () => {
    if (this.state.expression.join("").includes(".")) {
      this.setFloatState()
    } else {
      this.setIntState()
    }
  }

  /**
   * Check if display is a number type and if so convert to string
   * Call toggleNumberType to set application state accordingly
   * This is necessary as the application uses strings rather than numbers
   * for convenience as strings are easier to manipulate
   */
  checkNumberType = () => {
    if (typeof this.state.display == "number") {
      const strNum = this.state.display.toString()
      this.setState({ display: strNum }, () => this.toggleNumberType())
    } else {
      this.toggleNumberType()
    }
  }

  /**
   * Clear the display
   */
  clearDisplay = () => {
    this.setState({ display: "0." })
    this.clearExpression()
    this.setIntState()
  }

  /**
   * Backspace a last number
   */
  backSpace = () => {
    if (this.state.display === "0." || this.state.display === "Error") return
    let newDisplay
    if (this.state.display.length === 1) {
      newDisplay = "0."
    } else {
      newDisplay = this.state.display.substr(0, this.state.display.length - 1)
    }
    this.setState({ display: `${newDisplay}` }, () => {
      if (this.state.display !== "0.") {
        this.checkNumberType()
      }
    })
  }

  /**
   * Add a number to the display
   * If state.display > 40 the number cannot fit and will display "Error"
   * @param {String} num - the number string passed to update display
   */
  printNumber = (num) => {
    if (this.state.display === "Error") {
      this.setState({ display: "" })
    }
    this.updateExpression(num)
    if (this.state.display.length >= 40) {
      this.clearExpression()
      return this.setState({ display: "Error" })
    }
    if (this.state.display == "0." || this.state.display == "0") {
      this.setState((prevState) => ({
        display: `${num}`,
      }))
    } else {
      this.setState((prevState) => ({
        display: `${prevState.display}${num}`,
      }))
    }
  }

  /**
   * Add number or operator to expression array in state
   */
  updateExpression = (str) => {
    const { expression } = this.state
    const operators = ["+", "-", "/", "*", "%"]
    if (typeof str === "number") str = str.toString()
    if (
      operators.includes(str) ||
      operators.includes(this.state.display[this.state.display.length - 1])
    ) {
      expression.push(str)
    } else {
      expression[expression.length - 1] += str
    }
    this.setState({ expression: expression })
  }

  /**
   * Reset expression state array
   * @param {String} newExp - string to replace old expression
   */
  clearExpression = (newExp = "") => {
    if (typeof newExp === "number") newExp = newExp.toString()
    this.setState((prevState) => ({
      expression: [newExp],
    }))
  }

  /**
   * Evaluate arithemtic expression and display result
   * Uses eval even though this function is considered dangerous
   * Eval is dangerous when using on sensitive data, but the data
   * in this calculator is clearly not sensitive
   */
  compute = () => {
    const result = eval(this.state.expression.join(""))
    if (isNaN(result)) {
      this.setState({ display: "Error" })
      return this.clearExpression()
    }
    this.setState(
      {
        display: result,
      },
      () => {
        this.clearExpression(result)
        this.checkNumberType()
      }
    )
  }

  /**
   * Add the decimal operator to display
   */
  addDecimal = () => {
    this.setFloatState()
    this.setState((prevState) => ({
      display: `${prevState.display}.`,
    }))
    this.updateExpression(".")
  }

  /**
   * Add the addition operator to display
   */
  addition = () => {
    this.setState((prevState) => ({
      display: `${prevState.display}+`,
    }))
    this.updateExpression("+")
  }

  /**
   * Add the subtraction operator to display
   */
  subtraction = () => {
    this.setState((prevState) => ({
      display: `${prevState.display}-`,
    }))
    this.updateExpression("-")
  }

  /**
   * Add the multiplication operator to display
   */
  multiplication = () => {
    this.setState((prevState) => ({
      display: `${prevState.display}*`,
    }))
    this.updateExpression("*")
  }

  /**
   * Add the division operator to display
   */
  division = () => {
    this.setState((prevState) => ({
      display: `${prevState.display}/`,
    }))
    this.updateExpression("/")
  }

  /**
   * Add the percent operator to display
   */
  percent = () => {
    if (this.state.display.includes("%")) return
    this.setState((prevState) => ({
      display: `${prevState.display}%`,
    }))
    this.updateExpression("%")
    this.computePercent()
  }

  /**
   * Process an expression string containing percentages
   * Called when the user adds a percent sign
   */
  computePercent = () => {
    if (this.state.expression.includes("%")) {
      const { expression } = this.state
      const percentOperatorIndex = expression.indexOf("%")
      const secondNum = expression[percentOperatorIndex - 1]
      const secondNumIndex = expression.indexOf(secondNum)
      const firstNum = expression[percentOperatorIndex - 3]
      const percentage = eval((secondNum / 100) * firstNum).toString()
      expression.splice(secondNumIndex, 1, percentage)
      expression.splice(percentOperatorIndex, 1)
      this.setState({ expression: expression })
    }
  }

  /**
   * Compute the square root of the current expression
   */
  squareRoot = () => {
    const sqrt = Math.sqrt(this.state.expression.join(""))
    this.setState({ display: sqrt }, () => {
      this.clearExpression(sqrt)
      this.checkNumberType()
    })
  }

  /**
   * Compute the reciprocal of the current expression
   */
  reciprocal = () => {
    const exp = this.state.expression.join("")
    const recip = eval(`1/ (${eval(exp)})`)
    this.setState({ display: recip }, () => {
      this.clearExpression(recip)
      this.checkNumberType()
    })
  }

  /**
   * Invert the last number in the current expression
   */
  toggleNegative = () => {
    const { expression } = this.state
    const lastNum = expression[expression.length - 1]
    const operators = ["+", "-", "/", "*", "%"]
    let newNum
    if (operators.includes(lastNum) || lastNum === "" || lastNum === "0") return
    if (lastNum < 0) {
      newNum = eval(`1*${lastNum}`).toString()
    } else if (lastNum > 0) {
      newNum = eval(`-1*${lastNum}`).toString()
    }
    expression.splice(expression.length - 1, 1, newNum)
    this.setState({ expression: expression })
    this.setState({ display: expression.join("") })
  }
}

export default App
