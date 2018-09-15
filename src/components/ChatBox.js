import React, { Component } from "react";
import "../styles/chatbox.css";
import chatBG from "../styles/chat-bg.jpg";

class ChatBox extends Component {
  render() {
    return (
      <div className="ChatBox">
        <div className="ChatDisplay">
        {chatBG}
        </div>
      </div>
    );
  }
}

export default ChatBox;
