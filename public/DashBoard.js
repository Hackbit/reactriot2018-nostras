import React, { Component } from "react";
import "../styles/dashboard.css";
import BreathingGif from "../styles/breather.gif";
import ChatPanel from "./ChatPanel";
import ChatBox from "./ChatBox";
import WebSocketConnection from "../helpers/WebSocketConnection";

class BeforeChat extends Component {
  render() {
    return (
      <React.Fragment>
        <img src={BreathingGif} id="Breather" />
        <form className="UserForm" onSubmit={this.props.setUserName}>
          <input
            className="form-control UserNameInput"
            ref={this.props.useref}
            id="UserName"
            placeholder="Choose Your Identity"
            required
          />
          <button className="UserBtn" type="submit">
            Use Me
          </button>
        </form>
      </React.Fragment>
    );
  }
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username") || "",
      socketConnection: null
    };
    this.username = React.createRef();
  }
  componentWillMount() {
    let socket = new WebSocketConnection.instantiate();
    socket.connect();
    this.setState({
      socketConnection: socket
    });
  }
  setUserName = e => {
    e.preventDefault();
    this.setState({ username: this.username.current.value });
    localStorage.setItem("username", this.username.current.value );
  };

  render() {
    return (
      <div className="DashBoard">
        <div className="row">
          <div className="LeftBlock col-3">
            <div className="logo">ANON-Y-CHAT</div>
            <ChatPanel />
          </div>
          {this.state.username ? (
            <div className="CenterBlock col-6">
              <ChatBox
                socket={this.state.socketConnection}
                username={this.state.username}
              />
            </div>
          ) : (
            <BeforeChat setUserName={this.setUserName} useref={this.username} />
          )}
          <div className="RightBlock col-3" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
