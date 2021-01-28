import "./App.css";
import Nav from "./Nav.js";
import Members from "./Members.js";
import Messages from "./Messages.js";
import ChatInputbox from "./ChatInputbox.js";
import ChatHeader from "./Header.js";

import { useState } from "react";

function App() {
  const [activeChannel, setActiveChannel] = useState(0);

  const onChannelUpdate = (index) => {
    setActiveChannel(index);
  };

  return (
    <div className="App">
      <Nav onChannelUpdate={onChannelUpdate} />
      <section className="App-center">
        <ChatHeader active={activeChannel} />
        <Messages active={activeChannel} />
        <ChatInputbox active={activeChannel} />
      </section>
      <Members />
    </div>
  );
}

export default App;
