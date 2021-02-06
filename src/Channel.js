import React, { useState, useEffect } from "react";

import ChatInputbox from "./ChatInputbox.js";
import ChatHeader from "./Header.js";
import Messages from "./messages/Messages.js";
import { db } from "./firebase/firebase.js";

const Channel = ({ channelId, user, onDrawerClicked }) => {
  useEffect(() => {
    console.log(user);

    // update the user document with the joined channels
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    });
  }, [channelId, user]);

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
