import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db, auth } from "../firebase.js";
import Message from "./Message.jsx";

const MessagesAdmin = ({ scroll, chosenChat }) => {
  const [dbData, setdbData] = useState([{ messsage: "what's wrong?" }]);
  const [onlineStatus, setonlineStatus] = useState([]);
  const { uid, photoURL } = auth.currentUser;
  useEffect(async () => {
    // const querySnapshot = await onSnapshot(collection(db, "chats"));
    const msgQuery = query(collection(db, `chats/${chosenChat}/messages`) , orderBy("createdAt"));
    const unsubscribe = onSnapshot(msgQuery, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        chats.push(doc.data());
      });
      setdbData(chats);
    });
    try {
      const statusDocRef = doc(db, "chats", "isOnline");
      const statusDocSnap = await getDoc(statusDocRef);
      if (statusDocSnap.exists()) {
        console.log("Document data:", statusDocSnap.data().regions);
        const unsubIsOnline = onSnapshot(doc(db, "chats", "isOnline"), (doc) => {
          console.log("Current updated data: ", doc.data());
          setonlineStatus(doc.data().regions);
        });
        const unsubReferences = onSnapshot(doc(db, "chats", "chatRefs"), (doc) => {
          console.log("Current updated data: ", doc.data());
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error in the status document", error.message);
    }

    console.log(msgQuery);
  }, [chosenChat]);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
    console.log(dbData);
  }, [dbData]);

  return (
    <div className="messages-container messages-container--admin">
      {dbData.length > 0 ? (
        dbData.map((msg) => (
          <Message
            key={Math.random()}
            message={msg}
            onlineStatus={onlineStatus}
          ></Message>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <div className="fakediv" ref={scroll}></div>
    </div>
  );
};

export default MessagesAdmin;
