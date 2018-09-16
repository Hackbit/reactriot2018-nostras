import React, { Component } from "react";
import "../styles/chatbox.css";
import { awaitConnection } from "../helpers/WebSocketConnection";
import * as moment from "moment";
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

class ChatDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    awaitConnection(this.state.socket, () =>
      this.state.socket.fetchMessages(this.props.chatroom_id)
    );
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  renderMessages = messages => (
    <React.Fragment>
      <ul id="messageList" ref={this.myRef}>
        {messages.map(message => {
          let det = message.author === this.props.username;
          let style = {
            background: det ? "#e1f7c9" : "#fff",
            marginLeft: det ? "auto" : 0,
            marginRight: det ? "auto" : 0
          };
          return (
            <React.Fragment>
              <div
                className={`MessageContainer ${
                  det ? "box sent" : " box received"
                }`}
                key={message.id}
                style={style}
              >
                {message.content}
                {det ? null : (
                  <div className="AuthorTag">~{message.author}</div>
                )}
                {det ? null : (
                  <div className="TimeTag">{moment(message.created_at).fromNow()}</div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </ul>
      <div
        style={{ float: "left", clear: "both" }}
        ref={el => {
          this.messagesEnd = el;
        }}
      />
    </React.Fragment>
  );
  render() {
    return (
      <div className="ChatDisplay">
        {this.renderMessages(this.props.messages)}
      </div>
    );
  }
}
class ChatTopBar extends Component {
  render() {
    return (
      <div className="ChatTopBar row">
        <div className="ChatTitle col-8">
          {this.props ? this.props.chatroom : "Chat Name"}
        </div>
        <div className="ChatUserName col">
          Chatting as{" "}
          <em style={{ color: "limegreen" }}>{this.props.username}</em>
        </div>
      </div>
    );
  }
}
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      chatroom: "",
      ...props
    };
  }
  componentWillMount() {
    let { socket, username } = this.props;
    let { chatroom_id } = this.state;
    awaitConnection(socket, () => socket.startChat(username, chatroom_id));
    socket.setCallbacks({
      init_chat: this.initChat,
      new_message: this.loadNewMessage,
      fetch_messages: this.fetchMessages
    });
  }
  sendMessage = (e, message) => {
    e.preventDefault();
    let { socket, username } = this.props;
    let data = { message, from: username, to: this.state.chatroom_id };
    awaitConnection(socket, () => socket.sendMessage(data));
    this.setState({ message: "" });
  };

  loadNewMessage = data => {
    this.setState({ messages: [...this.state.messages, data.message] });
  };
  fetchMessages = data => {
    this.setState({ messages: [...data.messages] });
  };
  messageChange = event => {
    this.setState({ message: event.target.value });
  };
  initChat = data => {
    this.setState({ ...data.data });
    localStorage.setItem("chatroom_id", data.data.chatroom_id);
  };

  render() {
    return (
      <div className="ChatBox">
        <ChatTopBar
          chatroom={this.state.chatroom}
          username={this.state.username}
        />
        {this.state.chatroom_id ? (
          <ChatDisplay
            messages={this.state.messages}
            username={this.state.username}
            chatroom_id={this.state.chatroom_id}
            socket={this.state.socket}
          />
        ) : null}
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
