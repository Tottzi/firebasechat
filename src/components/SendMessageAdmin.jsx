import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import SignOut from "./SignOut";
import { collection, addDoc, getDocs, FieldValue, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase.js";

const SendMessageAdmin = ({ scroll, chosenChat }) => {
  const [input, setinput] = useState("");
  const sendMsg = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    try {
      const docRef = await addDoc(collection(db, `chats/${chosenChat}/messages`), {
        message: input,
        uid1: uid,
        uid2: "Y4ICriKal6TIGFnscWKnyM8EcPx2",
        sender: uid,
        photoURL,
        createdAt: new Date(),
      });
      setinput("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="input-container">
      <form onSubmit={sendMsg} className="input-form">
        <SignOut />
        <Input
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setinput(e.target.value)}
          required
          style={{ width: "100%" }}
        ></Input>
        <Button type="submit" variant="contained" style={{zIndex: '2'}}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default SendMessageAdmin;
