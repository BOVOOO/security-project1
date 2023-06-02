const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()
const cors = require('cors')
const CryptoJS = require('crypto-js')

app.use(express.json())
app.use(cors())

app.post('/chat', async (req, res) => {
  const apiNumber = Math.floor(Math.random() * 10) + 1;
  const apiKey = process.env[`API_KEY_${apiNumber}`]
  console.log("Swapping...\nKey number:", apiNumber)
  try {
    console.log('Ciphered message:', req.body.cipherText)
    const message = CryptoJS.AES.decrypt(req.body.cipherText, process.env.KEY).toString(CryptoJS.enc.Utf8)
    console.log('Deciphered message:', message)
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    // Extract the model-generated reply
    const reply = response.data.choices[0].message.content
    console.log('Reply:', reply)
    const cipherReply = CryptoJS.AES.encrypt(reply, process.env.KEY).toString();
    console.log('Ciphered reply:', cipherReply)
    res.json({ cipherReply })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred' })
  }
})

app.listen(process.env.PORT, () => {
  console.log('Server running on', process.env.PORT)
})
