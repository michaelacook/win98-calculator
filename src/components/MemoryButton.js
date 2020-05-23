import React from "react"

const MemoryButton = (props) => {
  return (
    <button onClick={props.keyFunction} className="memory-button main-button">
      {props.value}
    </button>
  )
}

export default MemoryButton
