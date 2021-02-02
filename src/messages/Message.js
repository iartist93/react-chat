import React, { useState } from "react";
import FirstMessage from "./FirstMessage";
import SubMessage from "./SubMessage";

const Message = ({ message, index, showAvatar, showDay }) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const isSelected = index === selectedMessageIndex;

  return (
    <div
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
      {showAvatar ? (
        <FirstMessage message={message} showDay={showDay} />
      ) : (
        <SubMessage message={message} index={index} isSelected={isSelected} />
      )}
    </div>
  );
};

export default Message;
