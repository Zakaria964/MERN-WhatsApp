import React from "react";
import "./SidebarChat.scss";
import Avatar from "@mui/material/Avatar";

/* -------------------------------------------------------------------------- */

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
