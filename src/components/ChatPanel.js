import React, { Component } from "react";
import "../styles/panel.css";

class JoinRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = { new_id: "" };
  }
  handleJoinGroup = (e, new_id) => {
    e.preventDefault();
    localStorage.setItem("chatroom_id", new_id);
    window.location.reload();
  };
  newIdChange = event => {
    this.setState({ new_id: event.target.value });
  };
  render() {
    return (
      <form
        className="JoinForm"
        onSubmit={e => {
          this.handleJoinGroup(e, this.state.new_id);
        }}
      >
        <input
          className="form-control"
          ref={this.props.new_id_ref}
          value={this.state.new_id}
          onChange={this.newIdChange}
          id="RoomId"
          placeholder="Enter Chatroom ID"
          required
        />
        <button className="btn-lg action-button">
          <i className="fas fa-door-open" />
          Join ChatRoom
        </button>
      </form>
    );
  }
}
class ChatPanel extends Component {
  leavePeacefully = e => {
    localStorage.clear();
    window.location.reload();
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Invite User To ChatRoom
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Copy the ID below and share it with your friend(s) for a group
                  chat.
                </p>
                <input
                  className="IDinput"
                  value={this.props.chatroom_id ? this.props.chatroom_id: "Kindly refresh page to fetch ChatRoom ID"}
                  readOnly={true}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
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
            type="button"
            onClick={e => this.leavePeacefully(e)}
          >
            <i className="fas fa-walking" /> Leave
          </button>
          <button
            className="btn-lg action-button"
            data-target="#exampleModal"
            data-toggle="modal"
          >
            <i className="fas fa-user-plus" />
            Invite Particiant
          </button>
          <JoinRoomForm />
        </div>
      </React.Fragment>
    );
  }
}

export default ChatPanel;
