import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const FirstMessage = ({ message }) => {
  const date = message.created_at.toDate().toLocaleTimeString("en", {
    timeStyle: "short",
  });

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    let isComponentMounted = true;
    db.doc(message.author.path)
      .get()
      .then((user) => {
        // ensure the component is still mounted before any side effect of the component
        if (isComponentMounted) {
          setAuthor(user.data());
        }
      });
    return () => {
      isComponentMounted = false;
    };
  }, [message.author]);

  return (
    author && (
      <div className="first-message-item" key={message.id}>
        <img src={author.photoURL} alt={"ahmed"} className="message-avatar" />
        <div className="first-message-body">
          <div className="first-message-header">
            <span className="frist-message-author">{author.displayName}</span>{" "}
            <span className="frist-message-time">{date}</span>
          </div>
          <p className="message-content">{message.text}</p>
        </div>
      </div>
    )
  );
};

export default FirstMessage;
