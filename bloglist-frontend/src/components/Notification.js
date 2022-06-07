import React from 'react'

const Notification = ({ message, error }) => {

  if(message === null) {
    return null
  }

  return (
    <div className={error}>
      {message}
    </div>
  )
}

export default Notification