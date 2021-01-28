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

  const handleSubmit = (e) => {
    const initalHeight = 50;
    e.preventDefault();
    db.collection("channels")
      .doc(channels[active]?.id)
      .collection("messages")
      .add({
        text: e.target.value,
        created_at: new Date(),
      });
    e.target.value = "";
    e.target.style.height = `${initalHeight}px`;
  };

  return (
    // <form className="chat-messages-form" onSubmit={handleSubmit}>
    <form className="chat-messages-form" onSubmit={handleSubmit}>
      <textarea
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
        }}
        onInput={(e) => {
          const initalHeight = 50;
          // const scrollHeight = e.target.scrollHeight;
          const numberOfLines = e.target.value.split("\n").length;
          const charsNum = e.target.value.trim().length;

          e.target.style.height = "";
          e.target.style.height =
            charsNum > 0 && numberOfLines > 1
              ? `${initalHeight + numberOfLines * 10.0}px`
              : `${initalHeight}px`;
          console.log(charsNum);
        }}
        rows="3"
        type="text"
        placeholder="message #general"
        className="message-input"
      />
    </form>
  );
};

export default ChatInputbox;
