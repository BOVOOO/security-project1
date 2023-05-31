import React from 'react'

function Message({isSent, text}) {
  return (
    <div className={isSent ? 'message sent' : 'message received'}>
      <p className="response">{text}</p>
    </div>
  )
}

export default Message