import "./styles/App.css";
import Nav from "./Nav.js";
import Members from "./Members.js";
import Channel from "./Channel.js";
import SiginIn from "./SignIn";

import { Router, Redirect } from "@reach/router";
import { useState, useEffect } from "react";
import { firebase } from "./firebase/firebase.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (siginedInUser) => {
      if (siginedInUser) setUser(siginedInUser);
      else setUser(null);
    });
  }, []);
  return user;
};

function App() {
  const authUser = useAuth();

  console.log(authUser);
  return (
    <div className="App">
      {authUser ? (
        <>
          <Nav />
          <section className="App-center">
            <Router>
              <Channel path="channel/:channelId" user={authUser} />
              <Redirect from="/" to="channel/development" />
            </Router>
          </section>
          <Members />
        </>
      ) : (
        <SiginIn />
      )}
    </div>
  );
}

export default App;
