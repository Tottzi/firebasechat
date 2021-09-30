import React from "react";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  query,
} from "firebase/firestore";

const SignIn = () => {
  const signInWithGoogle = (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);

        try {
          const isOnline = doc(db, "chats", "isOnline");
          await updateDoc(isOnline, {
            regions: arrayUnion(auth.currentUser.uid)
        });
          
        } catch (e) {
          console.error("Error updating document: ", e);
        }
        // try {
        //   const docRef = await addDoc(collection(db, "chats", "isOnline"), {
        //     message: input,
        //     uid1: uid,
        //     uid2: 'Y4ICriKal6TIGFnscWKnyM8EcPx2',
        //     sender: uid,
        //     photoURL,
        //     createdAt: new Date(),
        //   });
        //   setinput('')
        //   console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //   console.error("Error adding document: ", e);
        // }
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('problem in signin')
      });
  };

  return (
    <div>
      <Button onClick={signInWithGoogle} variant="outlined">
        Sign In With Google
      </Button>
    </div>
  );
};

export default SignIn;
