import React, { useEffect, useRef, useState } from "react";
import useCollection from "../hooks/useCollection";
import FirstMessage from "./FirstMessage";
import SubMessage from "./SubMessage";

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
    <div className="channel-messages-wrapper">
      <div className="messages-container" ref={formRef}>
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const isFirstMessage =
            !prevMessage || message.author.id !== prevMessage.author.id;

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
              {isFirstMessage ? (
                <FirstMessage message={message} />
              ) : (
                <SubMessage
                  message={message}
                  index={index}
                  selectedMessageIndex={selectedMessageIndex}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
