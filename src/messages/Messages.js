import React, { useEffect, useRef } from "react";
import useCollection from "../hooks/useCollection";

import Message from "./Message";

const Messages = ({ channelId }) => {
  const messages = useCollection(
    `channels/${channelId}/messages`,
    "created_at"
  );
  console.log(messages.length);
  const messagesScrollRef = useRef();

  useEffect(() => {
    const scrollNode = messagesScrollRef.current;
    scrollNode.scrollTo({
      top: scrollNode.scrollHeight,
    });
  });

  return (
    <div className="channel-messages-wrapper">
      <div className="messages-container" ref={messagesScrollRef}>
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showAvatar = getShowAvatar(prevMessage, message);
          return (
            <Message
              key={index}
              message={message}
              index={index}
              showAvatar={showAvatar}
            />
          );
        })}
      </div>
    </div>
  );
};

function getShowAvatar(previousMessage, currentMessage) {
  const isFirst = !previousMessage;
  if (isFirst) {
    return true;
  }

  const isSameAuthor = currentMessage.author.id !== previousMessage.author.id;

  return isSameAuthor;
}

export default Messages;
