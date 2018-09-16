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
class ChatDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  renderMessages = messages => (
    <ul>
      {messages.map(message => {
        let det = message.author === this.props.username;
        let style = {
          background: det ? "#e1f7c9" : "#fff",
          marginLeft: det ? "auto" : 0,
          marginRight: det ? "auto": 0,
        };
        return (
          <div
            className={`MessageContainer ${det ? "box sent" : " box received"}`}
            key={message.id}
            style={style}
          >
            {message.content}
          </div>
        );
      })}
    </ul>
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
      messages: [
        {
          id: "d63ce52d-177b-4ac0-b192-91662fb2a956",
          author: "Mango-People",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique lectus sit amet mauris bibendum, ornare scelerisque augue mattis. Nam sit amet ex sit amet nunc varius malesuada non ac purus.",
          created_at: "2018-09-16 10:01:09.106172+00:00"
        },
        {
          id: "3ffb0f93-febc-49ad-8ea9-4a85ae763041",
          author: "Mango-People2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique lectus sit amet mauris bibendum, ornare scelerisque augue mattis. Nam sit amet ex sit amet nunc varius malesuada non ac purus.",
          created_at: "2018-09-16 10:01:11.547348+00:00"
        },
        {
          id: "51ec2856-4eb2-471e-bc7f-bea01ae0f202",
          author: "Mango-People2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique lectus sit amet mauris bibendum, ornare scelerisque augue mattis. Nam sit amet ex sit amet nunc varius malesuada non ac purus.",
          created_at: "2018-09-16 10:01:12.946125+00:00"
        },
        {
          id: "06609378-b78b-4c00-ba61-6e60967ee905",
          author: "Mango-People",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique lectus sit amet mauris bibendum, ornare scelerisque augue mattis. Nam sit amet ex sit amet nunc varius malesuada non ac purus.",
          created_at: "2018-09-16 10:01:16.574448+00:00"
        },
        {
          id: "a09b9972-befa-45f3-85cf-529f530c831d",
          author: "Mango-People2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique lectus sit amet mauris bibendum, ornare scelerisque augue mattis. Nam sit amet ex sit amet nunc varius malesuada non ac purus.",
          created_at: "2018-09-16 10:01:17.936981+00:00"
        },
        {
          id: "3bf088b8-b882-4a3c-9782-7f129e858599",
          author: "Mango-People",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique lectus sit amet mauris bibendum, ornare scelerisque augue mattis. Nam sit amet ex sit amet nunc varius malesuada non ac purus.",
          created_at: "2018-09-16 10:01:19.289124+00:00"
        }
      ],
      message: "",
      chatroom: "",
      ...props
    };
  }
  componentDidMount() {
    let { socket, username } = this.props;
    awaitConnection(socket, () => socket.startChat(username));
    socket.setCallbacks({
      init_chat: this.initChat,
      new_message: this.loadNewMessage
    });
  }
  sendMessage = (e, message) => {
    e.preventDefault();
    let { socket, username } = this.props;
    let data = { message, from: username, to: username + "-room" };
    awaitConnection(socket, () => socket.sendMessage(data));
    this.setState({ message: "" });
  };

  initChat = data => {
    this.setState({ ...data.data });
  };
  loadNewMessage = data => {
    this.setState({ messages: [...this.state.messages, data.message] });
    console.log(this.state.messages);
  };
  messageChange = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div className="ChatBox">
        <ChatTopBar
          chatroom={this.state.chatroom}
          username={this.state.username}
        />
        <ChatDisplay
          messages={this.state.messages}
          username={this.state.username}
        />
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
