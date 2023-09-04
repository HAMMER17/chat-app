import { useState } from "react";
import Chat from "./components/Chat";
// import NavBar from "./components/NavBar";
import Cookies from 'universal-cookie';
import Auth from "./components/Auth";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)

  if (!isAuth) {
    return (<div className="auth">
      <Auth setIsAuth={setIsAuth} />
    </div>
    )
  }
  return (
    <div className="App">
      {/* <NavBar /> */}
      <div className="chat_container">
        <Routes>

          <Route path="/" element={<Auth setIsAuth={setIsAuth} />} />
          <Route path="/chat" element={<Chat room={room} />} />
          <Route path="/home" element={<Home setRoom={setRoom} />} />

        </Routes>
      </div>
    </div>
  );
}


export default App;
