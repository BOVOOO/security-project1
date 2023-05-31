import Message from "./Message"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';


function Messages({messages}) {
      
      return (
    <div className='messages'>
      {messages.map((message) => (
            <Message text={message.message} key={uuidv4()} isSent={message.isSent}/>
      ))}

      {/* <Message text='' isSent={true}/>
      <Message text='    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae deserunt id incidunt quae officia, voluptas ipsa, ut laboriosam facere voluptates excepturi vero nostrum neque iste? Nobis provident vitae vero neque accusamus alias iste ratione, amet magnam distinctio minima totam, eius nisi tempora! Eius vitae quidem reprehenderit minima recusandae provident inventore.
' isSent={false}/>
      <Message text='    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae deserunt id incidunt quae officia, voluptas ipsa, ut laboriosam facere voluptates excepturi vero nostrum neque iste? Nobis provident vitae vero neque accusamus alias iste ratione, amet magnam distinctio minima totam, eius nisi tempora! Eius vitae quidem reprehenderit minima recusandae provident inventore.
' isSent={true}/>
      <Message text='    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae deserunt id incidunt quae officia, voluptas ipsa, ut laboriosam facere voluptates excepturi vero nostrum neque iste? Nobis provident vitae vero neque accusamus alias iste ratione, amet magnam distinctio minima totam, eius nisi tempora! Eius vitae quidem reprehenderit minima recusandae provident inventore.
' isSent={false}/> */}
    </div>
  )
}

export default Messages