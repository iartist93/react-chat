import React from "react";

const SubMessage = ({ message, isSelected }) => {
  const date = message.created_at.toDate().toLocaleTimeString("en", {
    timeStyle: "short",
  });

  return (
    <div className="sub-message-item" key={message.id}>
      <p
        className={`message-date ${
          isSelected ? "" : "sub-message-time-hidden"
        }`}
      >
        {date.split(" ")[0]}
      </p>
      <div className="message-content">{message.text}</div>
    </div>
  );
};

export default SubMessage;
