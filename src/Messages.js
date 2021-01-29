import woody from "./woody_small.jpg";
import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase.js";

const Messages = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    return db
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => docs.push(doc.data()));
        setMessages(docs);
        formRef.current.scrollTo(0, formRef.current.scrollHeight);
      });
  }, [channelId]);

  return (
    <div className="App-messages" ref={formRef}>
      {messages.map((message, index) => {
        const date = message.created_at.toDate().toLocaleTimeString("en", {
          timeStyle: "short",
        });

        return (
          <div
            key={index}
            className={`message ${
              selectedMessageIndex !== null && selectedMessageIndex === index
                ? "selected-message"
                : ""
            }`}
            onMouseEnter={(e) => {
              setSelectedMessageIndex(index);
            }}
            onMouseLeave={(e) => {
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
                  {date.split(" ")[0]}
                </p>
                <div className="message-content">{message.text}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
