import React, { useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp, query, onSnapshot, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../firebase.js'
import NavBar from './NavBar.js';
import { MdAddAPhoto } from 'react-icons/md'

const Chat = (props) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState('')
  const [message, setMessage] = useState([])
  const [file, setFile] = useState(null)
  console.log(message)
  const messagesRef = collection(db, 'messages')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage === '') return;

    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
            img: downloadURL
          })
          setNewMessage('')
          setFile(null)

        });
      }
    );

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
            <img src={data?.img} alt="" />
          </div>
        })}
        <footer>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Text...'
              onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
            <input style={{ display: 'none' }} id='file' type="file" onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="file" className='label'>
              <MdAddAPhoto size={30} />
            </label>
            <button>Message</button>
          </form>
        </footer>

      </div>
    </>
  )
}

export default Chat
