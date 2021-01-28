import db from "./firebase.js";
import { useEffect, useState } from "react";

const ChatHeader = ({ active }) => {
  ///TODO: Refactor this to use global state for all channels array
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    return db.collection("channels").onSnapshot((collectionSnapshot) => {
      let docs = [];
      collectionSnapshot.forEach((doc) =>
        docs.push({ ...doc.data(), id: doc.id })
      );
      setChannels(docs);
    });
  }, [active]);

  return (
    <header className="App-header">
      <h2 className="header-title">#{channels[active]?.id}</h2>
      <section className="header-subtitle">
        <p>🧑 4</p>
        <p className="channel-topic">{channels[active]?.topic}</p>
      </section>
    </header>
  );
};

export default ChatHeader;
