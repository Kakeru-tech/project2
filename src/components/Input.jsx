import React,{useContext,useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {ChatContext} from '../context/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import {db,storage} from '../firebase'
import {v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


import {IoIosAttach}  from 'react-icons/io'
import {BsCardImage} from 'react-icons/bs'

function Input() {
  const [text,setText] = useState('');
  const [img,setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async()=>{
    if(img){
      const uploadTask = uploadBytesResumable(ref(storage,uuid()),img);

      uploadTask.on(
        (error) => {
        },
        () => {
          //upload the photo and receive url
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,'chats', data.chatId),{
              messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                data:Timestamp.now(),
                img:downloadURL,
              }),
            })
            console.log('downloadURL',downloadURL)
          });
          console.log('your image is successfully uploaded');
        }
      );

    }else{
      await updateDoc(doc(db,'chats', data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          data:Timestamp.now(),
        }),
      })
      console.log('your text is successfully uploaded');

    }

    //update the latest message(your side)
    await updateDoc(doc(db,'userChats',currentUser.uid),{
      [data.chatId + '.lastMessage']:{
        text
      },
      [data.chatId + '.date']:serverTimestamp()
    });

    //update the latest message(the opponent side)
    await updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId + '.lastMessage']:{
        text
      },
      [data.chatId + '.date']:serverTimestamp()
    });

    setText('');
    setImg(null);
  }

  return (
    <div className="input">
      <input type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        {/* <IoIosAttach size={25}/> */}
        <input type="file" style={{display:'none'}} id='file' onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <BsCardImage size={25}/>
        </label>
        {text==''&&img==null
        ?<button disabled style={{backgroundColor:'gray'}}>send</button>
        :<button onClick={handleSend}>send</button>
        }
      </div>
    </div>
  )
}

export default Input
