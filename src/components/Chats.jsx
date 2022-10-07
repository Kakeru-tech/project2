import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';

function Chats() {

  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        console.log('func in useEffect')
        setChats(doc.data())
      });

      return () => {
        console.log('in cleanup func')
        unsub();
      };
    };

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect =(userInfo)=>{
    dispatch({type:'CHANGE_USER',payload:userInfo})
  }


  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map(chat=>(

        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage ? chat[1].lastMessage.text :'[content]'}</p>
        </div>
      </div>

      ))}
    </div>
  )
}

export default Chats