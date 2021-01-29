import googleSignIn from "./images/google/2x/btn_google_signin_dark_normal_web@2x.png";

import React from "react";
import { firebase } from "./firebase/firebase.js";
import { useState } from "react";

const SiginIn = () => {
  const [signInError, setSignInError] = useState(null);

  const handleSignIn = async () => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
      setSignInError(error);
    }
  };

  return (
    <div className="app-sigin-wrapper">
      <div className="sigin-card">
        <img
          onClick={handleSignIn}
          className="google-singin-button"
          src={googleSignIn}
          alt="sigin"
        />
        <div
          className="signin-error-message"
          style={{
            visibility: signInError ? "visible" : "hidden",
            color: "red",
          }}
        >
          {signInError}
        </div>
      </div>
    </div>
  );
};
export default SiginIn;
