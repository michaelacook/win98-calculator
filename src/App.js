/* root component */

import React, { Component } from "react";
import Header from "./Header";
import Calculator from "./Calculator";
import Options from "./Options";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      int: true,
      float: false,
    };
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
        />
      </div>
    );
  }

  /**
   * Clear the display
   */
  clearDisplay = () => {
    this.setState({ display: "0" });
  };

  /**
   * Add a number to the display
   * If state.display > 40 the number cannot fit and will display "Error"
   * @param {String} num - the number string passed to update display
   */
  printNumber = (num) => {
    if (this.state.display === "Error") {
      this.setState({ display: "" });
    }
    if (this.state.display.length >= 40) {
      return this.setState({ display: "Error" });
    }
    if (this.state.int) {
      if (this.state.display === "0") {
        this.setState((prevState) => ({
          display: `${num}`,
        }));
      } else {
        this.setState((prevState) => ({
          display: `${prevState.display}${num}`,
        }));
      }
    }
  };
}

export default App;
