import woody from "./woody_small.jpg";
import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase.js";
// import firestore from "firebase/firestore";

import firebase from "firebase/app";

const Messages = ({ active }) => {
  console.log(active);

  const [messages, setMessages] = useState([]);
  const formRef = useRef(null);

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

  useEffect(() => {
    return db
      .collection("channels")
      .doc(channels[active]?.id)
      .collection("messages")
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => docs.push(doc.data()));
        setMessages(docs);
        formRef.current.scrollTo(0, formRef.current.scrollHeight);
      });
  }, [active, channels]);

  return (
    <main className="App-main" ref={formRef}>
      {messages.map((message, index) => {
        const date = firebase.firestore.Timestamp.fromMillis(message.created_at)
          .toDate()
          .toLocaleTimeString();

        return (
          <div key={index} class="message-item">
            <img src={woody} alt={"ahmed"} className="message-avatar" />
            <div className="message-body">
              <div className="message-header">
                <span class="message-author">Ahmad</span>
                <span class="message-time">{date}</span>
              </div>
              <p class="message-content">{message.text}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Messages;
