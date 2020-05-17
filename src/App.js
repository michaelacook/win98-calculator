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
          addDecimal={this.addDecimal}
          compute={this.compute}
          addition={this.addition}
          subtraction={this.subtraction}
          multiplication={this.multiplication}
          division={this.division}
          squareRoot={this.squareRoot}
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
    if (this.state.display.includes(".")) {
      this.setFloatState();
    } else {
      this.setIntState();
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
      const strNum = this.state.display.toString();
      this.setState({ display: strNum }, () => this.toggleNumberType())
    } else {
      this.toggleNumberType();
    }
  }

  /**
   * Clear the display
   */
  clearDisplay = () => {
    this.setState({ display: "0." })
    this.setIntState()
  }

  /**
   * Backspace a last number
   */
  backSpace = () => {
    if (this.state.display === "0." || this.state.display === "Error") return
    let newDisplay;
    if (this.state.display.length === 1) {
      newDisplay = "0.";
    } else {
      newDisplay = this.state.display.substr(0, this.state.display.length - 1)
    }
    this.setState({ display: `${newDisplay}` }, () => {
      if (this.state.display !== "0.") {
        this.checkNumberType();
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
    if (this.state.display.length >= 40) {
      return this.setState({ display: "Error" })
    }
    if (this.state.display == "0." || this.state.display == "0") {
      this.setState((prevState) => ({
        display: `${num}`,
      }))
    } else {
      this.setState((prevState) => ({
        display: `${prevState.display}${num}`
      }))
    }
  }

  /**
   * Determine if a number if floating point of not
   * @param {String} num - number string
   */
  isFloat = num => !Number.isInteger(eval(num));

  /**
   * Evaluate arithemtic expression and display result
   */
  compute = () => {
    this.setState({
      display: eval(this.state.display)
    }, () => this.checkNumberType());
  }

  addDecimal = () => {
    this.setFloatState();
    this.setState(prevState => ({
      display: `${prevState.display}.`
    }))
  }

  /**
   * Add the addition operator to display
   */
  addition = () => {
    this.setState(prevState => ({
      display: `${prevState.display}+ `
    }));
  }

  /**
   * Add the subtraction operator to display
   */
  subtraction = () => {
    this.setState(prevState => ({
      display: `${prevState.display}- `
    }));
  }

  /**
   * Add the multiplication operator to display
   */
  multiplication = () => {
    this.setState(prevState => ({
      display: `${prevState.display}* `
    }));
  }

  /**
   * Add the division operator to display 
   */
  division = () => {
    this.setState(prevState => ({
      display: `${prevState.display}/ `
    }));
  }

  /**
   * Get square root of display 
   * If display is an arithmetic expression the square root of the evaluated expression will be given
   */
  squareRoot = () => {
    this.setState({
      display: Math.sqrt(eval(this.state.display))
    }, () => this.checkNumberType());
  }
}

export default App
