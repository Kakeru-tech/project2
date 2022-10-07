import React,{useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import {ChatContext} from '../context/ChatContext'

import {AiOutlineUserAdd} from 'react-icons/ai'
import {BsCameraVideo} from 'react-icons/bs'
import {FiMoreHorizontal} from 'react-icons/fi'


const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <BsCameraVideo size={25}/>
          <AiOutlineUserAdd size={25}/>
          <FiMoreHorizontal size={25}/>
        </div>
      </div>
      <Messages/>
      <Input/>


    </div>
  )
}

export default Chat