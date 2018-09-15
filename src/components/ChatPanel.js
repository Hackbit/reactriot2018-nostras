import React, { Component } from "react";
import "../styles/panel.css";

class ChatPanel extends Component {
  render() {
    return (
      <div className="ChatPanel">
        <button className="btn-lg action-button">
          <i class="fas fa-door-open" />
           Leave
        </button>
        <button className="btn-lg action-button">
          <i class="fas fa-trash-alt" />
            Delete Chat
        </button>
        <button className="btn-lg action-button">
          <i class="fas fa-user-plus" />
            Invite Particiant
        </button>
      </div>
    );
  }
}

export default ChatPanel;
