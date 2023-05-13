import React, { useState } from "react";
import "./Chat.scss";
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood";
import MicIcon from "@mui/icons-material/Mic";
import moment from "moment";
import axios from "../../axios.js";
/* -------------------------------------------------------------------------- */

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "DEMO APP",
      timestamp: "Just Now",
      received: false,
    });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chatHeaderInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__receiver"}`}
            id={messages._id}
          >
            <span className="chat__name">{message.name}</span>
            <span>{message.message}</span>
            <span className="chat__timestamp">
              {moment(new Date().toUTCString()).fromNow()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <MoodIcon />
        <form
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          type="text"
        >
          <input type="text" placeholder="type a message" />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
