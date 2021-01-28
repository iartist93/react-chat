import woody from "./woody_small.jpg";
import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase.js";

const Messages = ({ active }) => {
  console.log(active);

  const [messages, setMessages] = useState([]);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
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
    <main className="App-messages" ref={formRef}>
      {messages.map((message, index) => {
        const date = message.created_at.toDate().toLocaleTimeString("en", {
          timeStyle: "short",
        });

        return (
          <div
            className={`message ${
              selectedMessageIndex !== null && selectedMessageIndex === index
                ? "selected-message"
                : ""
            }`}
            onMouseEnter={(e) => {
              console.log(date);
              setSelectedMessageIndex(index);
            }}
            onMouseLeave={(e) => {
              console.log(date);
              setSelectedMessageIndex(null);
            }}
          >
            {index === 0 ? (
              <div className="message-item" key={index}>
                <img src={woody} alt={"ahmed"} className="message-avatar" />
                <div className="message-body">
                  <div className="message-header">
                    <span className="message-author">Ahmad</span>
                    <span className="message-time">{date}</span>
                  </div>
                  <p className="message-content">{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="message-sub-item" key={index}>
                <p
                  className={`message-date ${
                    index === selectedMessageIndex ? "" : "message-time-hidden"
                  }`}
                >
                  {date}
                </p>
                <p className="message-content">{message.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default Messages;
