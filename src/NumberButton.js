import React from "react"

const NumberButton = (props) => {
  return (
    <button
      data-number={props.value}
      className="main-button"
      onClick={() => props.printNumber(props.value)}
    >
      {props.value}
    </button>
  )
}

export default NumberButton
