import woody from "./images/woody_small.jpg";
import React, { useEffect, useRef, useState } from "react";
import useCollection from "./hooks/useCollection";

const Messages = ({ channelId, user }) => {
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
    <div className="channel-messages-wrapper">
      <div className="messages-container" ref={formRef}>
        {messages.map((message, index) => {
          const date = message.created_at.toDate().toLocaleTimeString("en", {
            timeStyle: "short",
          });

          return (
            <div
              key={index}
              className={`message-wrapper ${
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
                <div className="first-message-item" key={index}>
                  <img src={woody} alt={"ahmed"} className="message-avatar" />
                  <div className="first-message-body">
                    <div className="first-message-header">
                      <span className="frist-message-author">
                        {user.displayName}
                      </span>{" "}
                      <span className="frist-message-time">{date}</span>
                    </div>
                    <p className="message-content">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="sub-message-item" key={index}>
                  <p
                    className={`message-date ${
                      index === selectedMessageIndex
                        ? ""
                        : "sub-message-time-hidden"
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
