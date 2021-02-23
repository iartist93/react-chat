import React, { useEffect, useRef } from "react";
import isSameDay from "date-fns/isSameDay";
import useCollection from "../hooks/useCollection";
import Message from "./Message";
import { format } from "date-fns";

const Messages = ({ channelId, user }) => {
  const messages = useCollection(
    `channels/${channelId}/messages`,
    "created_at"
  );

  const scrollAmount = useRef(0);
  const messagesScrollRef = useRef();

  useEffect(() => {
    const scrollNode = messagesScrollRef.current;
    if (getShouldScroll(scrollNode)) {
      scrollNode.scrollTo({
        top: scrollNode.scrollHeight,
      });
    }
  });

  return (
    <div className="channel-messages-wrapper">
      <div
        className="messages-container"
        ref={messagesScrollRef}
        onScroll={(e) => {
          console.log("On Scoll");
          const shouldScroll = getShouldScroll(e.target);
          // console.log(shouldScroll);
          scrollAmount.current = e.target.scrollTop;
        }}
      >
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showAvatar = getShowAvatar(prevMessage, message);
          const showDay = getShowDay(prevMessage, message);
          const day = format(message.created_at.toDate(), "EEEE, MMMM do");
          return (
            <div key={index}>
              {showDay && (
                <div className="message-day-seperator">
                  <div></div>
                  <p> {day} </p>
                  <div></div>
                </div>
              )}
              <Message
                message={message}
                index={index}
                showAvatar={showAvatar}
                showDay={showDay}
              />
            </div>
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

function getShouldScroll(scrollNode) {
  const scrollHeight = scrollNode.scrollHeight;
  const clientHeight = scrollNode.clientHeight;
  const scrollTop = scrollNode.scrollTop;
  const scrollBottom = scrollHeight - (scrollTop + clientHeight);

  // console.log(`${scrollHeight} ${clientHeight} ${scrollTop} ${scrollBottom}`);

  if (scrollBottom < 150) {
    return true;
  } else {
    return false;
  }
}

export default Messages;
