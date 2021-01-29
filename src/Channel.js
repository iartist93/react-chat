import React from "react";

import ChatInputbox from "./ChatInputbox.js";
import ChatHeader from "./Header.js";
import Messages from "./Messages.js";

const Channel = ({ channelId, user }) => {
  return (
    <>
      <div className="channel">
        <ChatHeader channelId={channelId} />
        <Messages channelId={channelId} user={user} />
        <ChatInputbox channelId={channelId} />
      </div>
    </>
  );
};

export default Channel;
