import React from "react"

const Display = (props) => {
  return (
    <div className="field-row">
      <input type="text" value={props.display} id="display" readOnly />
    </div>
  )
}

export default Display
