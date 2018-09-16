import React, { Component } from "react";
import "../styles/panel.css";

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
            <i className="fas fa-address-book" />
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
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Invite User To ChatRoom
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Copy the ID below and share it with your friend(s) for a group chat.</p>
                <input 
                className="IDinput"
                value={this.props.chatroom_id}
                />
                </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ChatPanel">
          <button
            className="btn-lg action-button"
            data-target="#exampleModal"
            data-toggle="modal"
          >
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
