import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom';
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value;
    const pw = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, pw)
      navigate('/')
    } catch (error) {
      setErr(true);
    }

  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">Kakeru Chat</span>
        <span>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email'></input>
          <input type='password' placeholder='password'></input>


          <button>Sign In</button>
          {err &&
            <span>Something went wrong</span>}
        </form>
        <p>You do not have an account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login