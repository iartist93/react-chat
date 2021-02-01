import React, { useEffect, useRef } from "react";
import useCollection from "../hooks/useCollection";

import Message from "./Message";

const Messages = ({ channelId }) => {
  const messages = useCollection(
    `channels/${channelId}/messages`,
    "created_at"
  );

  const messagesScrollRef = useRef();

  useEffect(() => {
    const scrollNode = messagesScrollRef.current;
    scrollNode.scrollTo({
      top: scrollNode.scrollHeight,
    });
    console.log(`Effect : ${scrollNode.scrollHeight}`);
  });

  return (
    <div className="channel-messages-wrapper">
      <div
        className="messages-container"
        ref={messagesScrollRef}
        onScroll={(e) => console.log(e.target.scrollHeight)}
      >
        {messages.map((message, index) => {
          console.log("Messages");
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
