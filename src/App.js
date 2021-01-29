import "./App.css";
import Nav from "./Nav.js";
import Members from "./Members.js";
import Channel from "./Channel.js";

import { Router, Redirect } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Nav />
      <section className="App-center">
        <Router>
          <Channel path="channel/:channelId" />
          <Redirect from="/" to="channel/development" />
        </Router>
      </section>
      <Members />
    </div>
  );
}

export default App;
