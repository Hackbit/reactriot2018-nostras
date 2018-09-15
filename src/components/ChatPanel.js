import React, { Component } from "react";
import "../styles/panel.css";

class ChatPanel extends Component {
    render() {
        return (
            <div className="ChatPanel">
               <button className="btn-lg action-button">Leave</button>
               <button className="btn-lg action-button">Delete Chat</button>
               <button className="btn-lg action-button">Invite Particiant</button>
            </div>
        );
    }
}

export default ChatPanel;
