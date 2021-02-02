import React, { useEffect, useRef } from "react";
import isSameDay from "date-fns/isSameDay";
import useCollection from "../hooks/useCollection";
import Message from "./Message";
import { format } from "date-fns";

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
          const showDay = getShowDay(prevMessage, message);
          const day = format(message.created_at.toDate(), "EEEE, MMMM do");
          return (
            <>
              {showDay && (
                <div className="message-day-seperator">
                  <div></div>
                  <p> {day} </p>
                  <div></div>
                </div>
              )}
              <Message
                key={index}
                message={message}
                index={index}
                showAvatar={showAvatar}
                showDay={showDay}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

function getShowDay(previousMessage, currentMessage) {
  if (!previousMessage) return true;

  const isSame = isSameDay(
    previousMessage.created_at.toDate(),
    currentMessage.created_at.toDate()
  );
  console.log(isSame);

  return !isSame;
}

function getShowAvatar(previousMessage, currentMessage) {
  const isFirst = !previousMessage;
  if (isFirst) return true;

  const isSameAuthor = currentMessage.author.id !== previousMessage.author.id;
  if (isSameAuthor) return true;

  // if time passed > 5 mintues
  const isLargeTimeGap =
    currentMessage.created_at.seconds - previousMessage.created_at.seconds >
    200;
  if (isLargeTimeGap) return true;

  return false;
}

export default Messages;
