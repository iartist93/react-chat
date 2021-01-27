import logo from "./slack.png";
import "./App.css";
import { useState, useEffect } from "react";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9O76O3eNgAf5Os2SrBktGtQUVmC3ZRZI",
  authDomain: "react-chat-fba68.firebaseapp.com",
  databaseURL: "https://react-chat-fba68-default-rtdb.firebaseio.com",
  projectId: "react-chat-fba68",
  storageBucket: "react-chat-fba68.appspot.com",
  messagingSenderId: "861942412840",
  appId: "1:861942412840:web:ed6af08031a022de6ae71d",
  measurementId: "G-2JH8R2JBW6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [channels, setChannels] = useState([
    { topic: "General topics", id: "general" },
    { topic: "Random topics", id: "random" },
  ]);
  const [activeChannel, setActiveChannel] = useState(0);

  console.log(activeChannel);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Chat App</p>
      </header>
      <nav>
        <h2 className="nav-section-title">Channels</h2>
        {channels.map((channel, index) => {
          return (
            <a
              key={channel.id}
              className={`channel-nav-item ${
                index === activeChannel ? "active-channel" : ""
              }`}
              href={`/channels/${channel.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveChannel(index);
              }}
            >
              #{channel.id}
            </a>
          );
        })}
      </nav>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default App;
