import React, { useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp, query, onSnapshot, where } from "firebase/firestore";
import { auth, db } from '../firebase.js'
import NavBar from './NavBar.js';

const Chat = (props) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState('')
  const [message, setMessage] = useState([])

  const messagesRef = collection(db, 'messages')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room
    })
    setNewMessage('')
  }
  useEffect(() => {
    const queryMessages = query(messagesRef, where('room', '==', room))
    const result = onSnapshot(queryMessages, (snapshot) => {
      let sms = []
      snapshot.forEach((doc) => {
        sms.push({ ...doc.data(), id: doc.id })
      })
      setMessage(sms)
    })
    return () => result()
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <NavBar />
      <div className='chat'>
        {message.map((data) => {
          return <div className={data.user === message[0]?.user ? 'user1' : 'user2'} key={data.id}>
            <h3>{data.user}</h3>
            <p>{data.text}</p>
          </div>
        })}
        <footer>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Text...'
              onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
            <button>Message</button>
          </form>
        </footer>

      </div>
    </>
  )
}

export default Chat
