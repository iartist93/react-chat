import googleSignIn from "./images/google/2x/btn_google_signin_dark_normal_web@2x.png";
import React from "react";
import { firebase } from "./firebase/firebase.js";
import { useState } from "react";

const SiginIn = () => {
  const [signInError, setSignInError] = useState(null);
  let isProcessing = false;

  const handleSignIn = async () => {
    try {
      if (!isProcessing) {
        isProcessing = true;
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(googleProvider);
        isProcessing = false;
      }
    } catch (error) {
      setSignInError(error.message);
    }
  };

  return (
    <div className="app-signin-wrapper">
      <div className="signin-header">
        <h1>SignIn Into ReactChat</h1>
      </div>
      <div className="signin-card">
        <h2> Continue With Google </h2>
        <img
          onClick={handleSignIn}
          className="google-signin-button"
          src={googleSignIn}
          alt="sigin"
        />
        <hr />
        <h2> Signin With Email </h2>
        <div
          className="signin-error-message"
          style={{
            visibility: signInError ? "visible" : "hidden",
            color: "red",
          }}
        >
          {signInError} Please try again.
        </div>
      </div>
    </div>
  );
};
export default SiginIn;
