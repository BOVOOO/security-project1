import React, { useState } from 'react'
import {FaPaperPlane} from 'react-icons/fa'

function InputBar({message, setMessage, handleSendClick}) {

  // const[message, setMessageLocal] = useState('')

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  const handleClick = () => {
    handleSendClick()
  }

  return (
    <div className='inputBar'>
        <textarea type="text" className='inputField' value={message} onChange={onChange} />
        <FaPaperPlane className='submitButton' onClick={handleClick}/>
    </div>
  )
}

export default InputBar