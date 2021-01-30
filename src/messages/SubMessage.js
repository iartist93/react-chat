import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const SubMessage = ({ message, index, selectedMessageIndex }) => {
  const date = message.created_at.toDate().toLocaleTimeString("en", {
    timeStyle: "short",
  });

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    db.doc(message.author.path)
      .get()
      .then((user) => setAuthor(user));
  }, [message.author]);

  return (
    author && (
      <div className="sub-message-item" key={message.id}>
        <p
          className={`message-date ${
            index === selectedMessageIndex ? "" : "sub-message-time-hidden"
          }`}
        >
          {date.split(" ")[0]}
        </p>
        <div className="message-content">{message.text}</div>
      </div>
    )
  );
};

export default SubMessage;
