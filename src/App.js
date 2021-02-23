import "./styles/App.css";
import Nav from "./Nav.js";
import Channel from "./Channel.js";
import SiginIn from "./SignIn";
import { Router, Redirect } from "@reach/router";
import { useState, useEffect } from "react";
import { db, firebase } from "./firebase/firebase.js";

function App() {
  const authUser = useAuth();
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="App">
      {authUser ? (
        <>
          <Nav user={authUser} showNav={showNav} />
          <div className="channel-section">
            <Router>
              <Channel
                path="channel/:channelId"
                user={authUser}
                onDrawerClicked={setShowNav}
              />
              <Redirect noThrow from="/" to="channel/development" />
            </Router>
          </div>
        </>
      ) : (
        <SiginIn />
      )}
    </div>
  );
}

const useAuth = () => {
  const currentUser = firebase.auth().currentUser;
  const [user, setUser] = useState(currentUser);
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
        setUser(userObject, { merge: true });
      } else setUser(null);
    });
  }, []);
  return user;
};

export default App;
