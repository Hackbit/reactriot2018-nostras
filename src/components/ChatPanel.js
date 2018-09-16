import React, { Component } from "react";
import "../styles/panel.css";
import "bootstrap/js/dist/dropdown";

class ChatPanel extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="dropdown">
          <button
            className="btn-lg dropdown-toggle action-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-address-book" />
            My ChatRooms
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
        <div className="ChatPanel">
          <button className="btn-lg action-button">
            <i className="fas fa-user-plus" />
            Invite Particiant
          </button>
          <form className="JoinForm">
            <input
              className="form-control"
              ref={this.props.useref}
              id="UserName"
              placeholder="Enter Chatroom ID"
              required
            />
            <button className="btn-lg action-button">
              <i className="fas fa-door-open" />
              Join ChatRoom
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatPanel;
