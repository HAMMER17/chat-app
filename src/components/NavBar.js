import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const NavBar = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()

  const outGoogle = () => {
    signOut(auth).then(() => {
      cookies.remove('auth-token')
      console.log('out')
      navigate('/')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className='navbar'>
      <h2 style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>Главная</h2>

      <h2>{auth?.currentUser?.displayName}</h2>
      <button onClick={outGoogle}>Выйти</button>
    </div>
  )
}

export default NavBar
