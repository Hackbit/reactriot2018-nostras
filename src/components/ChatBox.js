import React, { Component } from "react";
import "../styles/chatbox.css";
import { awaitConnection } from "../helpers/WebSocketConnection";
class MessageForm extends Component {
  render() {
    return (
      <form className="MessageForm">
        <div className="row MessageInputsRow">
          <div className="col-10">
            <input
              className="form-control"
              id="MessageText"
              placeholder="Enter Text Here"
            />
          </div>
          <div className="col" id="BtnCol">
            <button className="SendButton">
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}
class ChatTopBar extends Component {
  render() {
    return (
      <div className="ChatTopBar">
        <h2 className="ChatTitle">Chat Name</h2>
      </div>
    );
  }
}
class ChatBox extends Component {
  componentDidMount() {
    let { socket, user } = this.props;
    awaitConnection(socket, () => socket.startChat(user));
  }

  render() {
    return (
      <div className="ChatBox">
        <ChatTopBar />
        <div className="ChatDisplay">Hello</div>
        <MessageForm />
      </div>
    );
  }
}

export default ChatBox;
