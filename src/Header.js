const ChatHeader = () => {
  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <h2 className="header-title">#{channels[activeChannel]?.id}</h2> */}
      <h2 className="header-title">#general</h2>
      <section className="header-subtitle">
        <p>🧑 4</p>
        <p className="channel-topic">general messages avaiable to all.</p>
      </section>
    </header>
  );
};

export default ChatHeader;
