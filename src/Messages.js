import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import db from "./firebase.js";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    return db
      .collection("channels")
      .doc("development")
      .collection("messages")
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => docs.push(doc.data()));
        setMessages(docs);
        formRef.current.scrollTo(0, formRef.current.scrollHeight);
      });
  }, []);

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
