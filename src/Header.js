import React from "react";

const ChatHeader = ({ channelId }) => {
  return (
    <header className="App-header">
      <h2 className="header-title">#{channelId}</h2>
      <section className="header-subtitle">
        <p>🧑 4</p>
        <p className="channel-topic">{channelId}</p>
      </section>
    </header>
  );
};

export default ChatHeader;
