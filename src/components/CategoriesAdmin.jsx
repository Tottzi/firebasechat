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

const CategoriesAdmin = ({ setchosenChat }) => {
  const [categories, setcategories] = useState([]);
  const [isOnline, setisOnline] = useState([]);
  const setID = (e) => {
    setchosenChat(e.target.innerText);
  };
  useEffect(async () => {
    try {
      const catQuery = doc(db, "chats", "chatRefs");
      const catQuerySnap = await getDoc(catQuery);
      if (catQuerySnap.exists()) {
        console.log("Document data:", catQuerySnap.data().refs);
        const unsubCat = onSnapshot(doc(db, "chats", "chatRefs"), (doc) => {
          console.log("Current updated data: ", doc.data().refs);
          setcategories(doc.data().refs);
        });
        const unsubIsOnline = onSnapshot(
          doc(db, "chats", "isOnline"),
          (doc) => {
            console.log("Current updated data: ", doc.data());
            setisOnline(doc.data().regions);
          }
        );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error in the status document", error.message);
    }
  }, []);

  return (
    <div className="categories-container">
      {categories.length > 0 ? (
        categories.map((cat) => {
          const status = isOnline.some((id) => id === cat);
          return (
            <p key={Math.random()} 
            className='category-element'
            onClick={setID}
            style={status ? {backgroundColor: 'green', color: 'white'}: {backgroundColor: 'white', color: 'black'}}
            >
              {cat}
            </p>
          );
        })
      ) : (
        <p>no categories</p>
      )}
    </div>
  );
};

export default CategoriesAdmin;
