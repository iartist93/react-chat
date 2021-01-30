import "./styles/App.css";
import Nav from "./Nav.js";
import Members from "./Members.js";
import Channel from "./Channel.js";
import SiginIn from "./SignIn";

import { Router, Redirect } from "@reach/router";
import { useState, useEffect } from "react";
import { db, firebase } from "./firebase/firebase.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((siginedInUser) => {
      if (siginedInUser) {
        const userObject = {
          uid: siginedInUser.uid,
          displayName: siginedInUser.displayName,
          photoURL: siginedInUser.photoURL,
          email: siginedInUser.email,
        };
        db.collection("users").doc(siginedInUser.uid).set(userObject);
        setUser(userObject);
      } else setUser(null);
    });
  }, []);
  return user;
};

function App() {
  const authUser = useAuth();

  return (
    <div className="App">
      {authUser ? (
        <>
          <Nav user={authUser} />
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
