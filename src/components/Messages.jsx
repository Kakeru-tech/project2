import React,{useContext,useState,useEffect} from 'react'
import Message from './Message'
import {ChatContext } from '../context/ChatContext'
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import {db} from '../firebase'


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  
  

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,'chats',data.chatId),(doc)=>{
     doc.exists()&&setMessages(doc.data().messages);
    })

    return ()=>{
      unSub();
    }
  },[data.chatId])

  
  return (
    <div className="messages">
      {messages.map(message=>(
        <Message message={message} key={message.id}/>
      ))}

    </div>
  )
}

export default Messages