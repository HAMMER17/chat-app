import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import NavBar from './NavBar';

const Home = (props) => {
  const [themas, setThemas] = useState([])

  const { setRoom } = props
  const ref = useRef()
  const navigate = useNavigate()

  const q = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    let thema = []
    querySnapshot.forEach((doc) => {
      thema.push(doc.data().room)
    });
    setThemas(thema)
  }
  useEffect(() => {
    q()
  }, []);

  const createChat = async () => {
    await setRoom(ref.current.value)
    navigate('/chat')
  }
  const handleRoom = async (e) => {
    await setRoom(e)
    navigate('/chat')
  }
  return (
    <>
      <NavBar />
      <div className="room">
        <div className="themas">
          <h2>Темы можете выбрать любую или создать свою :</h2>
          {themas.filter((a, b) => themas.indexOf(a) === b).map((elem, id) => (
            <h4 style={{ margin: 10, cursor: 'pointer' }} key={id}
              onClick={() => handleRoom(elem)}>{elem.toUpperCase()}</h4>
          ))}

        </div>
        <h3>Создайте чат на любою тему</h3>
        <div className="thema">
          <input type="text" placeholder="Thema..." ref={ref} />
          <button onClick={createChat}>Создайте чат</button>
        </div>
      </div>
    </>
  )
}

export default Home
