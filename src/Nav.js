import { Link } from "@reach/router";
import { useState, useEffect } from "react";
import { db } from "./firebase.js";

const Nav = ({ onChannelUpdate }) => {
  const [channels, setChannels] = useState([]);

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
          <Link
            key={channel.id}
            className={`channel-nav-item ${
              index === 0 ? "active-channel" : ""
            }`}
            to={`/channel/${channel.id}`}
          >
            #{channel.id}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
