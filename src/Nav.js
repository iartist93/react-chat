import { useState, useEffect } from "react";
import { db } from "./firebase.js";

const Nav = () => {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(0);

  useEffect(() => {
    // Register new firestore collection lisnerer
    const unsubscribe = db
      .collection("channels")
      .onSnapshot((collectionSnapshot) => {
        // setChannels(collectionSnapshot.docs); //
        let docs = [];
        collectionSnapshot.forEach((doc) =>
          docs.push({ ...doc.data(), id: doc.id })
        );
        setChannels(docs);
      });
    return unsubscribe;
  }, []);

  return (
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
  );
};

export default Nav;
