import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase.js'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies()
const Auth = (props) => {
  const navigate = useNavigate()
  const { setIsAuth } = props

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set('auth-token', result.user.refreshToken)
      setIsAuth(true)
      navigate('/home')
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <div className='auth'>
      <h2>Welcome to my Chat</h2>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Auth
