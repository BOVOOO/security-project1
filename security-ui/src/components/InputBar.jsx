import React, { useState } from 'react'
import {FaPaperPlane} from 'react-icons/fa'

function InputBar({setMessage}) {

  const[message, setMessageLocal] = useState('')

  const onChange = (e) => {
    setMessageLocal(e.target.value)
  }

  return (
    <div className='inputBar'>
        <textarea type="text" className='inputField' value={message} onChange={onChange} />
        <FaPaperPlane className='submitButton' onClick={() => setMessage(message)}/>
    </div>
  )
}

export default InputBar