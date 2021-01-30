import React from "react";

const ChatHeader = ({ channelId, onDrawerClicked }) => {
  return (
    <header className="channel-header">
      <div className="channel-title-wrapper">
        <div
          className="channel-drawer-icon"
          onClick={() => onDrawerClicked(true)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h2 className="header-title">#{channelId}</h2>
      </div>

      <section className="header-subtitle">
        <p>🧑 4</p>
        <p className="channel-topic">{channelId}</p>
      </section>
    </header>
  );
};

export default ChatHeader;
