import React from "react";

import ChatInputbox from "./ChatInputbox.js";
import ChatHeader from "./Header.js";
import Messages from "./messages/Messages.js";

const Channel = ({ channelId, user, onDrawerClicked }) => {
  return (
    <>
      <div
        className="channel"
        onClickCapture={() => {
          onDrawerClicked(false);
        }}
      >
        <ChatHeader channelId={channelId} onDrawerClicked={onDrawerClicked} />
        <Messages channelId={channelId} user={user} />
        <ChatInputbox channelId={channelId} user={user} />
      </div>
    </>
  );
};

export default Channel;
