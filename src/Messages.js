import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import db from "./firebase.js";

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
        // const date = message.created_at.toDate();
        // console.log(date);
        return (
          <div key={index}>
            <div className="message-user">
              <div className="message-user-avatar" />
              <div className="message-info">
                {/* <span>{date}</span> */}
                {/* <span>Ahmad</span> */}
              </div>
            </div>
            <p>{message.text}</p>
          </div>
        );
      })}
    </main>
  );
};

export default Messages;
