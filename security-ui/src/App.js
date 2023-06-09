import React, { useState } from 'react'
import axios from 'axios'
import Messages from './components/Messages'
import InputBar from './components/InputBar'
import CryptoJS from 'crypto-js'
import './App.css'

const App = () => {
  const [message, setMessage] = useState('')
  const[messages, setMessages] = useState([])
  const [reply, setReply] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSendClick = () => {
    if (message.trim() !== '') {
      setMessages((prevState) => [
        ...prevState, 
        {message: message, isSent: true}
      ])
      setIsLoading(true) 
      const cipherText = CryptoJS.AES.encrypt(message, process.env.REACT_APP_KEY).toString();
      console.log(cipherText)
      axios
        .post('http://localhost:3001/chat', { cipherText })
        .then((response) => {
          console.log(response)
          const decipherText = CryptoJS.AES.decrypt(response.data.cipherReply, process.env.REACT_APP_KEY).toString(CryptoJS.enc.Utf8)
          setMessages((prevState) => [
            ...prevState, 
            {message: decipherText, isSent: false}
          ])
        })
        .catch((error) => {
          console.log(error)
          setReply('An error occurred.')
        })
        .finally(() => {
          setIsLoading(false) 
        })
    }
  }

  return (
    <div className="container">
      <Messages messages={messages}/>
      <InputBar setMessage={setMessage} message={message} handleSendClick={handleSendClick}/>
    </div>
  )

  // return (
  //   <div className="container">
  //     <h1>cryptoGPT</h1>
  //     <textarea
  //       className="message-input"
  //       rows="5"
  //       placeholder="Type your message..."
  //       value={message}
  //       onChange={handleMessageChange}
  //     ></textarea>
  //     <br />
  //     <button className="button" onClick={handleSendClick} disabled={message.trim() === '' || isLoading}>
  //       Send
  //     </button>
  //     {isLoading ? <p>Loading...</p> : reply && <p className="reply">{reply}</p>} 
  //   </div>
  // )
}

export default App
