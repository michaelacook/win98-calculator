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
          setFloatState={this.setFloatState}
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
   * Clear the display
   */
  clearDisplay = () => {
    this.setState({ display: "0." })
    this.setIntState()
  }

  /**
   * Backspace a whole number
   */
  backSpaceInt = () => {
    if (this.state.display.length === 2) {
      return this.setState({ display: "0." })
    }
    let newDisplay = this.state.display.split("")
    newDisplay.pop()
    newDisplay = newDisplay.slice(0, -1).join("")
    this.setState({ display: `${newDisplay}.` })
  }

  /**
   * Backspace a floating point number
   */
  backSpaceFloat = () => {
    if (this.state.display[this.state.display.length - 1] === ".") {
      this.setIntState()
      return this.backSpaceInt()
    }
    const newDisplay = this.state.display.slice(0, -1)
    this.setState({ display: newDisplay })
  }

  /**
   * Delete the last number entered
   */
  backSpace = () => {
    if (this.state.display === "0." || this.state.display === "Error") return
    if (this.state.int) {
      this.backSpaceInt()
    } else if (this.state.float) {
      this.backSpaceFloat()
    }
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
    if (this.state.display.length >= 40) {
      return this.setState({ display: "Error" })
    }
    if (this.state.int) {
      if (this.state.display === "0.") {
        this.setState((prevState) => ({
          display: `${num}.`,
        }))
      } else {
        this.setState((prevState) => ({
          display: `${prevState.display.substr(
            0,
            prevState.display.length - 1
          )}${num}.`,
        }))
      }
    } else if (this.state.float) {
      this.setState((prevState) => ({
        display: `${prevState.display}${num}`,
      }))
    }
  }
}

export default App
