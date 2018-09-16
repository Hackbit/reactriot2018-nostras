import React, { Component } from "react";
import "../styles/chatbox.css";
import { awaitConnection } from "../helpers/WebSocketConnection";
class MessageForm extends Component {
  render() {
    return (
      <form
        className="MessageForm"
        onSubmit={e => this.props.sendMessage(e, this.props.message)}
      >
        <div className="row MessageInputsRow">
          <div className="col-10">
            <input
              className="form-control"
              id="MessageText"
              onChange={this.props.messageChange}
              value={this.props.message}
              placeholder="Type a Message"
              required
            />
          </div>
          <div className="col" id="BtnCol">
            <button className="SendButton" type="submit">
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
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      ...props
    };
  }
  componentDidMount() {
    let { socket, user } = this.props;
    awaitConnection(socket, () => socket.startChat(user));
  }
  sendMessage = (e, message) => {
    e.preventDefault();
    let { socket, user } = this.props;
    let data = { message, from: user, to: user+'-room' };
    awaitConnection(socket, () => socket.sendMessage(data));
    console.log(data);
  };

  messageChange = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div className="ChatBox">
        <ChatTopBar />
        <div className="ChatDisplay">{this.state.message}</div>
        <MessageForm
          message={this.state.message}
          sendMessage={this.sendMessage}
          messageChange={this.messageChange}
        />
      </div>
    );
  }
}

export default ChatBox;
