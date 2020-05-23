/* buttons for clearing and backspacing */

import React from "react"

const DeleteButton = (props) => {
  return (
    <button onClick={props.keyFunction} className="delete-button">
      {props.value}
    </button>
  )
}

export default DeleteButton
