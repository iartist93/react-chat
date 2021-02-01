import React from "react";
import { db } from "./firebase/firebase.js";

const ChatInputbox = ({ channelId, user }) => {
  const handleSubmit = (e) => {
    const message = e.target.value.trim();
    if (message.length === 0) return;

    const initalHeight = 50;
    e.preventDefault();
    db.collection(`channels/${channelId}/messages`).add({
      author: db.doc(`users/${user.uid}`),
      text: message,
      created_at: new Date(),
    });
    e.target.value = "";
    e.target.style.height = `${initalHeight}px`;
  };

  return (
    <form className="messages-form" onSubmit={handleSubmit}>
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
        }}
        rows="3"
        type="text"
        placeholder={`message #${channelId}`}
        className="message-input"
      />
    </form>
  );
};

export default ChatInputbox;
