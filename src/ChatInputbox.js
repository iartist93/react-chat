import React from "react";
import db from "./firebase.js";

const ChatInputbox = () => {
  return (
    <form
      className="chat-messages-form"
      onSubmit={(e) => {
        e.preventDefault();
        db.collection("channels")
          .doc("development")
          .collection("messages")
          .add({
            text: e.target.elements[0].value,
            created_at: new Date(),
          });
        e.target.reset();
      }}
    >
      <input
        type="text"
        placeholder="message #general"
        className="message-input"
      />
    </form>
  );
};

export default ChatInputbox;
