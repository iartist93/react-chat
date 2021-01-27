import "./App.css";
import Nav from "./Nav.js";
import Members from "./Members.js";
import Messages from "./Messages.js";
import ChatInputbox from "./ChatInputbox.js";
import ChatHeader from "./Header.js";

function App() {
  return (
    <div className="App">
      <Nav />
      <section className="App-center">
        <ChatHeader />
        <Messages />
        <ChatInputbox />
      </section>
      <Members />
    </div>
  );
}

export default App;
