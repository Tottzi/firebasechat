import React from "react";
import { auth, db } from "../firebase.js";

import Messages from "./Messages";
import SendMessage from "./SendMessage";
import MessagesAdmin from "./MessagesAdmin";
import SendMessageAdmin from "./SendMessageAdmin";
import CategoriesAdmin from "./CategoriesAdmin.jsx";
const { useState, useEffect, useRef } = React;

const adminID = "Y4ICriKal6TIGFnscWKnyM8EcPx2";

const Chat = () => {
  const scroll = useRef()
  const [chosenChat, setchosenChat] = useState('')

  return auth.currentUser.uid === adminID
  ?(
    <div className='chat-container'>
      <div className='chatcatmsg-container'>
      <CategoriesAdmin setchosenChat={setchosenChat}/>
      {chosenChat.length>0 && <MessagesAdmin scroll={scroll} chosenChat={chosenChat}/>}
      </div>
      <SendMessageAdmin scroll={scroll} chosenChat={chosenChat}/>
    </div>
  )
  :(
    <div className='chat-container'>
      <Messages scroll={scroll}/>
      <SendMessage scroll={scroll}/>
    </div>
  );
};

export default Chat;
