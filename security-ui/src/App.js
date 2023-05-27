import React, { useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import './App.css'

const App = () => {
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSendClick = () => {
    if (message.trim() !== '') {
      setIsLoading(true) 
      const cipherText = CryptoJS.AES.encrypt(message, process.env.REACT_APP_KEY).toString();
      axios
        .post('http://localhost:3001/chat', { cipherText })
        .then((response) => {
          console.log(response)
          const decipherText = CryptoJS.AES.decrypt(response.data.cipherReply, process.env.REACT_APP_KEY).toString(CryptoJS.enc.Utf8)
          setReply(decipherText)
        })
        .catch((error) => {
          console.error(error)
          setReply('An error occurred.')
        })
        .finally(() => {
          setIsLoading(false) 
        })
    }
  }

  return (
    <div className="container">
      <h1>cryptoGPT</h1>
      <textarea
        className="message-input"
        rows="5"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      ></textarea>
      <br />
      <button className="button" onClick={handleSendClick} disabled={message.trim() === '' || isLoading}>
        Send
      </button>
      {isLoading ? <p>Loading...</p> : reply && <p className="reply">{reply}</p>} 
    </div>
  )
}

export default App
