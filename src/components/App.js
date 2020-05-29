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
      memory: "",
      int: true,
      float: false,
    }
    this.operators = ["+", "-", "/", "*", "%"]
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
          addToMemoryStore={this.addToMemoryStore}
          addToCurrentMemoryStore={this.addToCurrentMemoryStore}
          clearMemoryStore={this.clearMemoryStore}
          retrieveMemoryStore={this.retrieveMemoryStore}
        />
      </div>
    )
  }

  /**
   * Add number or expression to memory
   * MS button
   */
  addToMemoryStore = () => {
    const expression = this.state.expression,
      last = expression[expression.length - 1]
    if (
      this.operators.includes(last) ||
      last === "" ||
      this.state.memory !== ""
    ) {
      return
    }
    this.setState({
      memory: eval(expression.join("")).toString(),
    })
  }

  /**
   * Add a number to the current value in memory store
   * M+ button
   */
  addToCurrentMemoryStore = () => {
    const expression = this.state.expression,
      last = expression[expression.length - 1]
    if (this.state.memory === "" || this.operators.includes(last)) return
    this.setState((prevState) => ({
      memory: eval(
        `${prevState.memory} + ${eval(expression.join(""))}`
      ).toString(),
    }))
  }

  /**
   * Retrieve and print value in memory store
   * MR button
   */
  retrieveMemoryStore = () => {
    if (this.state.memory === "") return
    this.printNumber(this.state.memory)
    this.checkNumberType()
  }

  /**
   * Clear memory store
   * MC button
   */
  clearMemoryStore = () => {
    this.setState({ memory: "" })
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
   * Backspace last entry to the current expression
   */
  backSpaceExpression = () => {
    const { expression } = this.state,
      lastEntered = expression[expression.length - 1]
    if (lastEntered.length === 1) {
      if (expression.length === 1) {
        return this.clearExpression()
      } else {
        expression.pop()
        return this.setState({ expression: expression })
      }
    } else if (lastEntered.length === 2 && lastEntered[0] === "-") {
      if (expression.length === 1) {
        return this.clearExpression()
      } else {
        expression.pop()
      }
    } else if (lastEntered.length > 1) {
      let newLast = lastEntered.split("")
      newLast.pop()
      newLast = newLast.join("")
      expression.pop()
      expression.push(newLast)
    }
    this.setState({ expression: expression })
  }

  /**
   * Backspace the calculator display
   * @return {String} newDisplay - new string to be displayed
   * return value used by clearExpression
   */
  backSpaceDisplay = () => {
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
    return newDisplay
  }

  /**
   * Backspace last entry
   */
  backSpace = () => {
    const newDisplay = this.backSpaceDisplay()
    this.clearExpression(newDisplay)
    this.backSpaceExpression()
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
    if (typeof str === "number") str = str.toString()
    if (
      this.operators.includes(str) ||
      this.operators.includes(this.state.display[this.state.display.length - 1])
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
    if (
      this.operators.includes(
        this.state.expression[this.state.expression.length - 1]
      )
    )
      return
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
    if (this.state.expression[this.state.expression.length - 1] === "") return
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
    if (this.state.expression[this.state.expression.length - 1] === "") return
    this.setState((prevState) => ({
      display: `${prevState.display}+`,
    }))
    this.updateExpression("+")
  }

  /**
   * Add the subtraction operator to display
   */
  subtraction = () => {
    if (this.state.expression[this.state.expression.length - 1] === "") return
    this.setState((prevState) => ({
      display: `${prevState.display}-`,
    }))
    this.updateExpression("-")
  }

  /**
   * Add the multiplication operator to display
   */
  multiplication = () => {
    if (this.state.expression[this.state.expression.length - 1] === "") return
    this.setState((prevState) => ({
      display: `${prevState.display}*`,
    }))
    this.updateExpression("*")
  }

  /**
   * Add the division operator to display
   */
  division = () => {
    if (this.state.expression[this.state.expression.length - 1] === "") return
    this.setState((prevState) => ({
      display: `${prevState.display}/`,
    }))
    this.updateExpression("/")
  }

  /**
   * Add the percent operator to display
   */
  percent = () => {
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
      const { expression } = this.state,
        percentOperatorIndex = expression.lastIndexOf("%"),
        secondNum = expression[percentOperatorIndex - 1],
        secondNumIndex = expression.indexOf(secondNum),
        firstNum = expression[percentOperatorIndex - 3],
        percentage = eval((secondNum / 100) * firstNum).toString()
      expression.splice(secondNumIndex, 1, percentage)
      expression.splice(percentOperatorIndex, 1)
      this.setState({ expression: expression })
    }
  }

  /**
   * Compute the square root of the current expression
   */
  squareRoot = () => {
    const sqrt = Math.sqrt(eval(this.state.expression.join("")))
    this.setState({ display: sqrt }, () => {
      this.clearExpression(sqrt)
      this.checkNumberType()
    })
  }

  /**
   * Compute the reciprocal of the current expression
   */
  reciprocal = () => {
    const exp = this.state.expression.join(""),
      recip = eval(`1/ (${eval(exp)})`)
    this.setState({ display: recip }, () => {
      this.clearExpression(recip)
      this.checkNumberType()
    })
  }

  /**
   * Invert the last number in the current expression
   */
  toggleNegative = () => {
    const { expression } = this.state,
      lastNum = expression[expression.length - 1]
    let newNum
    if (this.operators.includes(lastNum) || lastNum === "" || lastNum === "0")
      return
    if (lastNum < 0) {
      newNum = eval(`${Math.abs(lastNum)}`).toString()
    } else if (lastNum > 0) {
      newNum = eval(`-1*${lastNum}`).toString()
    }
    expression.splice(expression.length - 1, 1, newNum)
    this.setState({ expression: expression })
    this.setState({ display: expression.join("") })
  }
}

export default App
