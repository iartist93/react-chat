import React from "react";

import ChatInputbox from "./ChatInputbox.js";
import ChatHeader from "./Header.js";
import Messages from "./Messages.js";

const Channel = ({ channelId }) => {
  return (
    <>
      <div className="messages-container">
        <ChatHeader channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputbox channelId={channelId} />
      </div>
    </>
  );
};

export default Channel;
