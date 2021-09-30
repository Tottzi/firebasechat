import React from "react";
import Button from "@mui/material/Button";
import { auth, db } from "../firebase.js";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  query,
} from "firebase/firestore";

const SignOut = () => {
  const signOutGoogle = () => {
    const signOutId = auth.currentUser.uid
    signOut(auth)
      .then(async () => {
        // Sign-out successful.
        console.log("Sign Out successful");
        try {
          const isOnline = doc(db, "chats", "isOnline");
          await updateDoc(isOnline, {
            regions: arrayRemove(signOutId)
        });
        } catch (e) {
          console.error("Error updating document: ", e);
        }
      })
      .catch((error) => {
        // An error happened.
        console.log("problem in signoun");
      });
  };
  return (
    <div className="signout-container">
      <Button
        onClick={signOutGoogle}
        style={{ backgroundColor: "red", width: "fit-content" }}
        variant="contained"
      >
        Out
      </Button>
    </div>
  );
};

export default SignOut;
