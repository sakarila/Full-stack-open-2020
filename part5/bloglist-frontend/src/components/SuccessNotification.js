import React from 'react'

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  const successMessageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={successMessageStyle}>
      {message}
    </div>
  )
}

export default SuccessNotification