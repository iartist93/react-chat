import woody from "./woody_small.jpg";
import React, { useEffect, useRef, useState } from "react";
import useCollection from "./hooks/useCollection";

const Messages = ({ channelId }) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const formRef = useRef(null);

  const messages = useCollection(
    `channels/${channelId}/messages`,
    "created_at"
  );

  useEffect(() => {
    formRef.current.scrollTo(0, formRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="channel-messages">
      <div className="messages-container" ref={formRef}>
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
                      index === selectedMessageIndex
                        ? ""
                        : "message-time-hidden"
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
    </div>
  );
};

export default Messages;
