import React from 'react'
import {FaPaperPlane} from 'react-icons/fa'

function InputBar() {
  return (
    <div className='inputBar'>
        <input type="text" className='inputField' />
        <FaPaperPlane className='submitButton'/>
    </div>
  )
}

export default InputBar