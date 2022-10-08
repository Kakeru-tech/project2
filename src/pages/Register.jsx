import React, { useState } from 'react'
import add from '../imgs/addAvatar.png'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth,db,storage} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate, Link} from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('')
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const pw = e.target[2].value;
    const file = e.target[3].files[0];

    setLoading(true);
    setErrMessage('')

    try {

      //creating a user
      const res = await createUserWithEmailAndPassword(auth, email, pw);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setErrMessage(err.message);
      setLoading(false);
    }
  };


  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">Kakeru Chat</span>
        <span>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='name'></input>
          <input type='email' placeholder='email'></input>
          <input type='password' placeholder='password'></input>
          <input style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor="file">
            <img src={add} alt="" width={40} height={40} />
            <span>Add an Avatar</span>
          </label>

          <button>Sign Up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err
          ?<span style={{color:'red'}}>{errMessage}</span>
          :''
            }
        </form>
        <p>You do have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register