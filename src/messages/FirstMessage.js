import React from "react";

import useDocWithCache from "../hooks/useDocWithCache";

const FirstMessage = ({ message, showDay }) => {
  const date = message.created_at.toDate().toLocaleTimeString("en", {
    timeStyle: "short",
  });

  const author = useDocWithCache(message.author.path);

  return author ? (
    <div className="message-with-avatar">
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
    </div>
  ) : (
    <div> Loading Message ...</div>
  );
};

export default FirstMessage;
