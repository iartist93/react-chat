import React from "react";
import { db } from "./firebase.js";
import { useEffect, useState } from "react";

const ChatInputbox = ({ active }) => {
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
  }, []);

  return (
    <form
      className="chat-messages-form"
      onSubmit={(e) => {
        e.preventDefault();
        db.collection("channels")
          .doc(channels[active]?.id)
          .collection("messages")
          .add({
            text: e.target.elements[0].value,
            created_at: new Date(),
          });
        e.target.reset();
      }}
    >
      <input
        type="text"
        placeholder="message #general"
        className="message-input"
      />
    </form>
  );
};

export default ChatInputbox;
